import { useState } from 'react'
import Editor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'

const DocumentEditor = () => {
	const [text, setText] = useState('hello md-editor-rt！')

	return (
		<Editor
			modelValue={text}
			pageFullScreen
			onChange={(modelValue) => {
				setText(modelValue)
			}}
		/>
	)
}

export default DocumentEditor
