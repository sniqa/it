import db from '../mongodb'
import { type NetType } from './netType'
import { type User } from './user'

type IpConfig = Partial<NetType> &
	Partial<User> & {
		ip: string
	}

const IP_CONFIG_COLLECTION_NAME = 'ipConfig'

const ipConfigModel = db.collection<IpConfig>(IP_CONFIG_COLLECTION_NAME)

export const createIp = async () => {}

export const deleteIp = async () => {}

export const modifyIp = async () => {}

export const findIp = async () => {}
