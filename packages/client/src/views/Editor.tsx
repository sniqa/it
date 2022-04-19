import { Button } from '@mui/material'
import DocumentEditor from '../comps/documentation/DocumentEditor'

const SAVE = '保存'

const Editor = () => {
	return (
		<div className="flex-grow flex flex-col my-4 mx-6 bg-light-50">
			<div className="h-4rem flex justify-end items-center px-4">
				<Button variant="outlined">{SAVE}</Button>
			</div>

			<DocumentEditor />
		</div>
	)
}

export default Editor
