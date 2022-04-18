import DocumentIntroduction from '../comps/documentation/DocumentIntroduction'
import Searchbar from '../comps/common/Searchbar'
import { useAppDispatch, useAppSelector } from '../store'
import { useEffect } from 'react'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../router'

const Documentation = () => {
	const documents = useAppSelector((state) => state.document)

	const dispatch = useAppDispatch()

	const onSearch = (val: string) => {
		console.log(val)
	}

	// 初始化数据
	useEffect(() => {}, [])

	return (
		<div className="flex-grow flex items-center flex-col">
			<div className="w-42rem mt-4">
				<Searchbar onSearch={onSearch} />

				{documents.length === 0 ? (
					<Blank />
				) : (
					documents.map((document) => (
						<DocumentIntroduction key={document._id} {...document} />
					))
				)}
			</div>
		</div>
	)
}

export default Documentation

// 当文档为空的时候提示页面
const EMPTY_DOCUMENT_HINT = '空空如也'
const CREATE_DOCUMENT_LABEL = '新建文档'

const Blank = () => {
	const navigate = useNavigate()

	return (
		<div className="mt-4 flex items-center">
			<Typography>{EMPTY_DOCUMENT_HINT}</Typography>
			<Button
				variant="contained"
				onClick={() => navigate(RoutePath.ROOT_EDITOR)}
				disableElevation
				sx={{ ml: '1rem' }}
			>
				{CREATE_DOCUMENT_LABEL}
			</Button>
			<Button></Button>
		</div>
	)
}
