import { ObjectId, WithId } from 'mongodb'
import { falseRes, trueRes, USER_REPEAT } from '../error'
import MongoDb from '../mongodb'

export interface User {
	account?: string
	name: string
	nickname?: string
	gender?: string
	department?: string
	desc?: string
}

const USERS_COLLECTION_NAME = 'users'

const UserModel = MongoDb.collection<User>(USERS_COLLECTION_NAME)

// 创建用户
export const createUser = async (data: User) => {
	const { name } = data

	const reapeatUser = await UserModel.findOne({ name })

	if (reapeatUser) {
		return falseRes(USER_REPEAT)
	}

	const newUser = await UserModel.insertOne(data).then((res) => ({ ...data }))

	return trueRes(newUser)
}

// 删除用户
export const deleteUser = async (data: Partial<WithId<User>>) => {
	const { _id } = data

	const res = await UserModel.deleteOne({ _id: new ObjectId(_id) })

	return trueRes(res)
}

// 更新用户
export const modifyUser = async (data: Partial<WithId<User>>) => {
	const { _id, ...resField } = data

	const res = await UserModel.findOneAndUpdate(
		{ _id: new ObjectId(_id) },
		{ $set: resField }
	).then((res) => ({ ...res.value, ...data }))

	return trueRes(res)
}

// 查找用户
export const findUser = async (data: Partial<WithId<User>>) => {
	data._id ? (data._id = new ObjectId(data._id)) : null

	const res = await UserModel.find(data).toArray()

	return trueRes(res)
}
