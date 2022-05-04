import { WithId } from './common'

export interface Documentation {
	title: string
	content: string
	introduction?: string
	recycle?: boolean
	createDate?: string
	lastModifyDate?: string
	author?: string
}

export type DocumentProps = WithId & Documentation
