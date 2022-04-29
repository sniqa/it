import { falseRes, trueRes, USER_REPEAT } from '../error'

export interface User {
	account?: string
	name: string
	nickname?: string
	gender?: string
	department?: string
	desc?: string
}



// 创建用户
export const createUser = async (data: User) => {
	
}

// 删除用户
export const deleteUser = async (data: Partial<User>) => {
	
}

// 更新用户
export const modifyUser = async (data: Partial<User>) => {
	
}

// 查找用户
export const findUser = async (data: Partial<User>) => {
	
}
