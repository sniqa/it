import { useState } from 'react'
import Editor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { Paper } from '@mui/material'
import { DocumentProps } from '@it/types'

const DocumentDetails = (props: DocumentProps) => {
	const { _id, content = '' } = props

	return (
		<Paper className="flex w-58rem px-4 mx-auto mt-4">
			<Editor modelValue={content} previewOnly />
		</Paper>
	)
}

export default DocumentDetails
