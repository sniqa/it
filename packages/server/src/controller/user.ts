import { hasKeys } from './../share/share'
import { falseRes, trueRes, USER_REPEAT, MISSING_PARAMS, MODIFY_ERROR, DENIED } from '../error'
import { UserProps, User } from '@it/types'
import MongoDb from '../mongodb'
import { ObjectId } from 'mongodb'

const USERS_COLLECTION_NAME = 'users'

const UserModel = MongoDb.collection<User>(USERS_COLLECTION_NAME)

// 创建用户
export const createUser = async (data: User) => {
	if (!hasKeys(data, 'fullname', 'account')) {
		return falseRes(MISSING_PARAMS)
	}

	const hasUser = await UserModel.findOne({ account: data.account })

	if (hasUser) {
		return falseRes(USER_REPEAT)
	}

	const newUserId = await (await UserModel.insertOne(data)).insertedId

	const newUser = await UserModel.findOne({ _id: newUserId })

	return trueRes(newUser)
}

// 删除用户
export const deleteUser = async (data: Partial<UserProps>) => {
	if (!hasKeys(data, '_id')) {
		return falseRes(MISSING_PARAMS)
	}

	const res = await UserModel.findOneAndDelete({ _id: new ObjectId(data._id) })

	return res.value ? trueRes(true) : falseRes(DENIED)
}

// 更新用户
export const modifyUser = async (data: Partial<UserProps>) => {
	if (!hasKeys(data, '_id')) {
		return falseRes(MISSING_PARAMS)
	}

	const { _id, ...resInfo } = data

	const newUserInfo = await UserModel.findOneAndUpdate(
		{ _id: new ObjectId(_id) },
		{
			$set: resInfo,
		}
	)

	return newUserInfo.ok ? trueRes(await UserModel.findOne({ _id: new ObjectId(_id) })) : falseRes(MODIFY_ERROR)
}

// 查找用户
export const findUser = async (data: Partial<UserProps>) => {
	const users = await UserModel.find(data).toArray()

	return trueRes(users)
}
