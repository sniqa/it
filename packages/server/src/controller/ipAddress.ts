import { MISSING_PARAMS, falseRes, trueRes, NET_TYPE_NOT_EXIST, IP_ADDRESS_NOT_EXIST } from './../error/index'
import { hasKeys } from '../share/share'
import { NetTypeModel } from './netType'
import { IpAddress, IpAddressProps } from '@it/types'
import MongoDb from '../mongodb'
import { ObjectId } from 'mongodb'

const IP_ADDRESS_COLLECTION_NAME = 'ipAddresses'

export const IpAddressModel = MongoDb.collection<IpAddress>(IP_ADDRESS_COLLECTION_NAME)

// 创建ip段范围
export const createIpRange = async (data: Array<IpAddress>) => {
	// if (!hasKeys(data, 'ipAddress', 'netType')) {
	// 	return falseRes(MISSING_PARAMS)
	// }

	const res = await IpAddressModel.insertMany(data)

	return trueRes(res)
}

// 删除ip段范围
export const deleteIpRange = async () => {
	IpAddressModel.deleteMany
}

// 分配Ip
export const assignIp = async (data: IpAddressProps) => {
	if (!hasKeys(data, 'ipAddress', 'netTypeName', 'account')) {
		return falseRes(MISSING_PARAMS)
	}

	const { netTypeName, ipAddress, _id, ...resInfo } = data

	// 更新数据
	const res = await IpAddressModel.findOneAndUpdate(
		{ ipAddress },
		{
			$set: { ...resInfo, used: true },
		}
	)

	// 该ip已分配，需要将网络类型中的已使用个数和未使用个数修改
	const netTypeInfo = await NetTypeModel.findOne({ netTypeName })

	if (!netTypeInfo) {
		return falseRes(NET_TYPE_NOT_EXIST)
	}

	const { ipAmount = 0 } = netTypeInfo

	// 获取已使用的ip数量
	const usedIpNumber = await (await IpAddressModel.find({ netTypeName, used: true }).toArray()).length

	const newNetTypeInfo = await NetTypeModel.findOneAndUpdate(
		{ netTypeName },
		{
			$set: {
				ipUnUsed: ipAmount - usedIpNumber,
				ipUsed: usedIpNumber,
			},
		}
	)

	if (res && newNetTypeInfo) {
		return trueRes({
			ipInfo: await IpAddressModel.findOne({ ipAddress }),
			netTypeInfo: await NetTypeModel.findOne({ netTypeName }),
		})
	}
}

// 回收已分配的ip
export const recycleIp = async (data: IpAddress) => {
	if (!hasKeys(data, 'ipAddress')) {
		return falseRes(MISSING_PARAMS)
	}

	const ipInfo = await IpAddressModel.findOne({ ipAddress: data.ipAddress })

	if (!ipInfo) {
		return falseRes(IP_ADDRESS_NOT_EXIST)
	}

	const res = await IpAddressModel.findOneAndReplace(
		{ ipAddress: data.ipAddress },
		{
			ipAddress: ipInfo.ipAddress,
			used: false,
			netTypeName: ipInfo.netTypeName,
		}
	)

	// 回收之后网络类型的使用数和未使用数也必须跟随更新
	const ipUsedNumber = await (
		await IpAddressModel.find({ netTypeName: ipInfo.netTypeName, used: true }).toArray()
	).length

	const netType = await NetTypeModel.findOne({ netTypeName: ipInfo.netTypeName })

	if (!netType) {
		return falseRes(NET_TYPE_NOT_EXIST)
	}

	const { ipAmount = 0 } = netType

	const newNetTypeInfo = await NetTypeModel.findOneAndUpdate(
		{ netTypeName: ipInfo.netTypeName },
		{
			$set: {
				ipUnUsed: ipAmount - ipUsedNumber,
				ipUsed: ipUsedNumber,
			},
		}
	)

	return trueRes({
		ipInfo: await IpAddressModel.findOne({ ipAddress: data.ipAddress }),
		netTypeInfo: await NetTypeModel.findOne({ netTypeName: ipInfo.netTypeName }),
	})
}

// 创建ip地址
export const createIp = async () => {}

export const deleteIp = async () => {}

export const modifyIp = async () => {}

export const findIp = async (data: Partial<IpAddressProps>) => {
	const ips = await IpAddressModel.find(data).toArray()

	return trueRes(ips)
}
