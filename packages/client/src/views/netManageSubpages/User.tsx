import { Button } from '@mui/material'
import Table, { CuzomTableProps } from '../../comps/table/CuzomTable'

const data: CuzomTableProps = {
	columns: [
		{ field: 'name', headerName: '名称', editable: true },
		{ field: 'nickname', headerName: '昵称' },
		{ field: 'department', headerName: '部门' },
		{ field: 'number', headerName: 'number' },
		{ field: 'action', headerName: '操作' },
	],
	rows: [
		{ id: 1, name: 'zwl', nickname: '2', department: '1', number: '13' },
		{ id: 2, name: 'zwl', nickname: '2', department: '1', number: '13' },
		{ id: 3, name: 'zwl', nickname: '2', department: '1', number: '13' },
		{ id: 4, name: 'zwl', nickname: '2', department: '1', number: '13' },
		{ id: 5, name: 'zwl', nickname: '2', department: '1', number: '13' },
	],
}

const user = () => {
	return (
		<div className="h-full flex flex-col p-2">
			<section className="h-3rem flex justify-end items-center">
				<Button variant="outlined">新建</Button>
			</section>

			<section className="flex-grow">
				<Table {...data} />
			</section>
		</div>
	)
}

export default user
