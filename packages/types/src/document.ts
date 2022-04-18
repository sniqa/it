interface WithId {
	_id: string
}

interface Documentation {
	title: string
	content: string
	introduction?: string
	recycle: boolean
	createDate: Date
	lastModifyDate: Date
	author?: string
}

export type DocumentProps = WithId & Documentation
