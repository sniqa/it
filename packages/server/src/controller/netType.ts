import { IpAddressModel } from './ipAddress'
import {
  falseRes,
  MISSING_PARAMS,
  NET_TYPE_REPEAT,
  DENIED,
  MODIFY_ERROR,
  trueRes,
  IP_FORMAT_ERROR,
  NOT_IN_THE_SAME_ADDRESS_RANGE,
} from '../error'
import ipaddr from 'ipaddr.js'
import ip from 'ip'
import { hasKeys } from '../share/share'
import { NetType, NetTypeProps, IpAddress } from '@it/types'
import MongoDb from '../mongodb'
import { ObjectId } from 'mongodb'

const NET_TYPE_COLLECTION_NAME = 'netTypes'

export const NetTypeModel = MongoDb.collection<NetType>(NET_TYPE_COLLECTION_NAME)

// 网络类型与ip地址是互相关联的两个集合，网络类型的增删改会反应到ip地址集合上，ip地址集合继承网络类型集合
// ip地址集合不能进行增删，其集合某些字段由网络类型进行控制

// 创建网络类型
// ip段结束地址为空，则使用该子网的末位ip地址为结束地址
export const createNetType = async (data: NetType) => {
  if (!hasKeys(data, 'netTypeName', 'ipStartAddress', 'subnetMask', 'gateway')) {
    return falseRes(MISSING_PARAMS)
  }

  const { ipStartAddress, subnetMask, gateway } = data

  // 验证ip格式
  if ([ipStartAddress, subnetMask, gateway].some((address) => !ipaddr.isValid(address))) {
    return falseRes(IP_FORMAT_ERROR)
  }

  // 网络类型是否重复
  const repeat = await NetTypeModel.findOne({ netTypeName: data.netTypeName })

  if (repeat) {
    return falseRes(NET_TYPE_REPEAT)
  }

  // 是否在同一地址段
  const ipStart = ipaddr.parse(ipStartAddress)

  // 子网掩码前缀长度
  const subnetMaskPrefixLen = ipaddr.parse(subnetMask).prefixLengthFromSubnetMask() as number

  // 如果提供结束地址，需要进行校验
  if (data.ipEndAddress) {
    const ipEnd = ipaddr.parse(data.ipEndAddress)

    if (!ipStart.match(ipEnd, subnetMaskPrefixLen)) {
      return falseRes(NOT_IN_THE_SAME_ADDRESS_RANGE)
    }
  } else {
    data.ipEndAddress = ip.subnet(ipStartAddress, subnetMask).lastAddress
  }

  // 创建ip地址
  const ipRange = getIpAddressRange(ipStartAddress, data.ipEndAddress)

  if (!ipRange) {
    return falseRes(NOT_IN_THE_SAME_ADDRESS_RANGE)
  }

  //创建ip地址段，不需要进行同步
  IpAddressModel.insertMany(
    ipRange.map((ip) => ({
      ipAddress: ip,
      netTypeName: data.netTypeName,
      used: false,
    }))
  )

  // 计算网段ip地址个数,并初始化数据
  const ipNumber = ipRange.length

  data.ipAmount = ipNumber

  data.ipUnUsed = ipNumber

  data.ipUsed = 0

  const newNetType = await NetTypeModel.insertOne(data)

  return trueRes(await NetTypeModel.findOne({ _id: newNetType.insertedId }))
}

// 删除网络类型
export const deleteNetType = async (data: NetTypeProps) => {
  if (!hasKeys(data, 'netTypeName')) {
    return falseRes(MISSING_PARAMS)
  }

  // 删除的时候需要把地址段一起删了，不需要同步
  IpAddressModel.deleteMany({
    netTypeName: data.netTypeName,
  })

  const res = await NetTypeModel.findOneAndDelete({ netTypeName: data.netTypeName })

  return res.value ? trueRes(true) : falseRes(DENIED)
}

// 更新网络类型
export const modifyNetType = async (data: NetTypeProps) => {
  if (!hasKeys(data, '_id')) {
    return falseRes(MISSING_PARAMS)
  }

  const { _id, ...resInfo } = data

  if (['netTypeName', 'ipStartAddress', 'ipEndAddress', 'subnetMask'].some((field) => Reflect.has(resInfo, field))) {
  }

  const newUserInfo = await NetTypeModel.findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $set: resInfo,
    }
  )

  return newUserInfo.ok ? trueRes(await NetTypeModel.findOne({ _id: new ObjectId(_id) })) : falseRes(MODIFY_ERROR)
}

// 查找网络类型
export const findNetType = async (data: Partial<NetTypeProps>) => {
  const users = await NetTypeModel.find(data).toArray()

  return trueRes(users)
}

// 获取指定开始Ip和结束Ip之间的所有ip,不会验证是否是同一个地址范围
const getIpAddressRange = (ipStartAddress: string, ipEndAddress: string) => {
  const ipRange: Array<string> = []

  const ipStartBinary = ip.toLong(ipStartAddress)

  const len = ip.toLong(ipEndAddress) - ipStartBinary + 1

  if (len <= 0) {
    return null
  }

  for (let i = 0; i < len; i++) {
    ipRange.push(ip.fromLong(ipStartBinary + i))
  }

  return ipRange
}
