import DocumentIntroduction from '../comps/documentation/DocumentIntroduction'
import Searchbar from '../comps/common/Searchbar'
import { useAppDispatch, useAppSelector } from '../store'
import { useEffect } from 'react'
import { Button, styled, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../router'
import { documentUpload } from '../apis/upload'

const Documentation = () => {
	const documents = useAppSelector((state) => state.document)

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const onSearch = (val: string) => {
		console.log(val)
	}

	// 初始化数据
	useEffect(() => {}, [])

	return (
		<div className="flex-grow flex items-center flex-col">
			<div className="w-42rem mt-2">
				<div className="flex justify-around items-center">
					<div className="flex-grow">
						<Searchbar onSearch={onSearch} />
					</div>

					{/* 新建文档 */}
					<Button
						variant="contained"
						onClick={() => navigate(RoutePath.ROOT_EDITOR)}
						disableElevation
						sx={{ ml: '1rem' }}
					>
						{CREATE_DOCUMENT_LABEL}
					</Button>

					{/* //导入文档 */}
					<label htmlFor="contained-button-file" className="ml-1rem">
						<input
							className="hidden"
							accept=""
							id="contained-button-file"
							multiple
							type="file"
							onChange={(e) => e.target.files && documentUpload(e.target.files)}
						/>
						<Button variant="contained" component="span" disableElevation>
							{EXPORT_DOCUMENT_LABEL}
						</Button>
					</label>
				</div>

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
const EXPORT_DOCUMENT_LABEL = '导入文档'

const Blank = () => {
	return (
		<div className="mt-4 flex items-center">
			<Typography>{EMPTY_DOCUMENT_HINT}</Typography>
		</div>
	)
}

// const Input = styled('input')({
// 	display: 'none',
// })
