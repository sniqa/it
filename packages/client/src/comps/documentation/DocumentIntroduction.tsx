import { Divider, Paper } from '@mui/material'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

export interface DocumentIntroductionProps {
	_id: string
	title: string
	content: string
	footer?: string
}

const DocumentIntroduction = (props: DocumentIntroductionProps) => {
	const { _id, title = 'title', content = 'content', footer } = props

	const navigate = useNavigate()

	const onClick = () => {
		navigate(_id)
	}

	return (
		<Paper elevation={2} className={`border p-4 my-4 w-full`} onClick={onClick}>
			<section className="">{title}</section>
			<Divider />
			<section className="h-4rem p-2 flex-wrap">{content}</section>

			{footer && (
				<Fragment>
					<Divider />
					<section className="">{footer}</section>
				</Fragment>
			)}
		</Paper>
	)
}

export default DocumentIntroduction
