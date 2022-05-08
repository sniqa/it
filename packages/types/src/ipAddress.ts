import { WithId } from './common'
import { User } from './user'

export interface IpAddress extends Partial<User> {
	ipAddress: string
	netTypeName: string
	used: boolean
	online?: boolean
}

export type IpAddressProps = WithId & IpAddress
