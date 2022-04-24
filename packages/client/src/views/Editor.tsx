import { Button } from '@mui/material'
import { useState } from 'react'
import DocumentEditor from '../comps/documentation/DocumentEditor'
import { documentUpload } from '../apis/upload'

const SAVE = '保存'

const Editor = () => {
	let content: string = ''

	const onSave = async () => {
		// const blob = new Blob([content], { type: 'text/markdown' })

		const file = new File([content], 'markdown.md', { type: 'text/markdown' })

		console.log(file)

		const res = await documentUpload([file])

		console.log(res)
	}

	return (
		<div className="flex-grow flex flex-col my-4 mx-6 bg-light-50">
			<div className="h-4rem flex justify-end items-center px-4">
				<Button variant="outlined" onClick={onSave}>
					{SAVE}
				</Button>
			</div>

			<DocumentEditor getContent={(val: string) => (content = val)} />
		</div>
	)
}

export default Editor
