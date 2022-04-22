import { useState } from 'react'
import Editor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { upload } from '../../apis/common'

const DocumentEditor = () => {
	const [text, setText] = useState('')

	const editorUpload = async (files: FileList, callBack: (urls: string[]) => void) => {
		const res = await upload(files)

		const r = Array.isArray(res) ? res.map((path) => path.filepath) : [res.filepath]

		callBack(r)
	}

	return (
		<Editor
			modelValue={text}
			editorClass={`flex-grow`}
			onChange={(modelValue) => {
				setText(modelValue)
			}}
			onUploadImg={editorUpload}
		/>
	)
}

export default DocumentEditor
