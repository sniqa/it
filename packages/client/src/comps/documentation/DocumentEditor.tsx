import { useState } from 'react'
import Editor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'

const DocumentEditor = () => {
	const [text, setText] = useState('')

	return (
		<Editor
			modelValue={text}
			pageFullScreen
			onChange={(modelValue) => {
				setText(modelValue)
			}}
			onUploadImg={(files) => {
				console.log(files)
			}}
		/>
	)
}

export default DocumentEditor
