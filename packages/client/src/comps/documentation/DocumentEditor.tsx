import { useState } from 'react'
import Editor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { upload } from '../../apis/common'

const DocumentEditor = () => {
	const [text, setText] = useState('')

	return (
		<Editor
			modelValue={text}
			editorClass={`flex-grow`}
			onChange={(modelValue) => {
				setText(modelValue)
			}}
			onUploadImg={upload}
		/>
	)
}

export default DocumentEditor
