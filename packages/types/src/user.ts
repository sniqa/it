import { WithId } from './common'

export interface User {
	account: string
	fullname: string
	department?: string
	nickname?: string
	descript?: string
}

export type UserProps = WithId & User
