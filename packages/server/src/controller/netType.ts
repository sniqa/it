import ip from 'ip'
import { Document, ObjectId, WithId } from 'mongodb'
import { falseRes, NET_TYPE_REPEAT, trueRes } from '../error'
import db from '../mongodb'

export interface NetType {
	netTypeName: string
	startIpAddress: string
	endIpAddress: string
	netmask: string
	gateway: string
	used?: number
	unused?: number
	desc?: string
}

type NetTypeModel = NetType & Document

const NET_TYPES_COLLECTION_NAME = 'netTypes'

const netTypeModel = db.collection<NetTypeModel>(NET_TYPES_COLLECTION_NAME)

// 创建网络类型
export const createNetType = async (data: NetType) => {
	const hasNetType = await netTypeModel.findOne({
		netTypeName: data.netTypeName,
	})

	// 重复
	if (hasNetType) {
		return falseRes(NET_TYPE_REPEAT)
	}

	// 初始化已使用和未使用的ip数
	data.unused = ip.toLong(data.endIpAddress) - ip.toLong(data.startIpAddress)

	data.used = 0

	const newNetType = await netTypeModel
		.insertOne(data)
		.then((res) => ({ ...data }))

	return trueRes(newNetType)
}

// 删除网络类型
export const deleteNetType = async (data: Partial<WithId<NetType>>) => {
	const { _id } = data

	const res = await netTypeModel.deleteOne({ _id: new ObjectId(_id) })

	return trueRes(res)
}

// 更新网络类型
export const modifyNetType = async (data: Partial<WithId<NetType>>) => {
	const { _id, ...resField } = data

	const res = await netTypeModel
		.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: resField })
		.then((res) => ({ ...res.value, ...data }))

	return trueRes(res)
}

// 查询网络类型
export const findNetTypes = async (data: Partial<WithId<NetType>>) => {
	data._id ? (data._id = new ObjectId(data._id)) : null

	const res = await netTypeModel.find(data).toArray()

	return trueRes(res)
}
