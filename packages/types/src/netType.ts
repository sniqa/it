import { WithId } from './common'

export interface NetType {
	netTypeName: string
	ipStartAddress: string
	ipEndAddress?: string
	subnetMask: string
	gateway: string
	ipAmount?: number
	ipUsed?: number
	ipUnUsed?: number
	dns1?: string
	dns2?: string
	descript?: string
}

export type NetTypeProps = WithId & NetType
