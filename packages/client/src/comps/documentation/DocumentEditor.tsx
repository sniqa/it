import { Dispatch, SetStateAction, useState } from 'react'
import Editor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { imageUpload } from '../../apis/upload'

interface DocumentEditorProps {
	getContent?: (val: string) => string
	cleanContent?: (fn: void) => void
}

const DocumentEditor = (porps: DocumentEditorProps) => {
	const { getContent = () => {}, cleanContent = () => {} } = porps

	const [text, setText] = useState('')

	const editorUpload = async (
		files: FileList,
		callBack: (urls: string[]) => void
	) => {
		const res = await imageUpload(files)

		const r = Array.isArray(res)
			? res.map((path) => path.filepath)
			: [res.filepath]

		callBack(r)
	}

	getContent(text)

	return (
		<Editor
			modelValue={text}
			editorClass={`flex-grow`}
			showCodeRowNumber
			onChange={(modelValue) => {
				setText(modelValue)
			}}
			onUploadImg={editorUpload}
		/>
	)
}

export default DocumentEditor
