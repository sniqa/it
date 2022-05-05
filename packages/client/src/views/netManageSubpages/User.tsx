import { Alert, Button, IconButton, Dialog, Snackbar, TextField, Typography, AlertColor } from '@mui/material'
import Table from '../../comps/table/CuzomTable'
import { GridColumns } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { UserProps, User } from '@it/types'
import { _fetch } from '../../apis/fetch'

interface SnackbarStatus {
	state: AlertColor
	message: string
}

const UserTable = () => {
	const [rows, setRows] = useState<Array<UserProps>>([])

	// 删除行
	const deleteRow = async (row: UserProps) => {
		const { deleteUser } = await _fetch({
			deleteUser: row,
		}).catch((res) =>
			setSnackbarStatus({
				state: 'error',
				message: '网络连接失败或服务器无响应',
			})
		)

		if (deleteUser) {
			if (deleteUser.success) {
				setSnackbarStatus({
					state: 'success',
					message: '删除用户成功',
				})

				setRows((oldRows) => oldRows.filter((oldRow) => oldRow._id != row._id))
			} else {
				setSnackbarStatus({
					state: 'error',
					message: '删除用户失败',
				})
			}
		}
	}

	// 列属性
	const columns: GridColumns<any> = useMemo(
		() => [
			{ field: 'account', headerName: '账号', flex: 1, editable: true },
			{ field: 'fullname', headerName: '名称', flex: 1, editable: true },
			{ field: 'nickname', headerName: '昵称', flex: 1 },
			{ field: 'department', headerName: '部门', flex: 1 },
			// { field: 'number', headerName: 'number' },
			{
				field: 'action',
				headerName: '操作',
				align: 'center',
				flex: 1,
				headerAlign: 'center',
				renderCell: (params) => (
					<Fragment>
						<IconButton onClick={() => console.log(params.row)}>
							<EditIcon>测试</EditIcon>
						</IconButton>

						<IconButton onClick={() => deleteRow(params.row)}>
							<DeleteIcon>删除</DeleteIcon>
						</IconButton>
					</Fragment>
				),
			},
		],
		[]
	)

	// 创建用户弹出框
	const [dialogOpen, setDialogOpen] = useState(false)

	// 消息提示栏
	const [snackbarStatus, setSnackbarStatus] = useState<SnackbarStatus>({
		state: 'success',
		message: '',
	})

	// 临时存储创建用户的数据
	const [user, setUser] = useState<User>({
		account: '',
		fullname: '',
		department: '',
		descript: '',
		nickname: '',
	})

	// 创建用户
	const createUser = async () => {
		if (user.account === '' || user.fullname === '') {
			return setSnackbarStatus({
				state: 'error',
				message: '账号和名称不能为空',
			})
		}

		const { createUser } = await _fetch({ createUser: user }).catch((res) =>
			setSnackbarStatus({
				state: 'error',
				message: '网络连接失败或服务器无响应',
			})
		)

		if (createUser.success) {
			setSnackbarStatus({
				state: 'success',
				message: '创建用户成功',
			})

			setRows([createUser.data, ...rows])

			setDialogOpen(false)
		} else {
			setSnackbarStatus({
				state: 'error',
				message: `创建用户失败：${createUser.errMsg}`,
			})
		}
	}

	// 初始获取用户数据
	useEffect(() => {
		_fetch({ findUser: {} })
			.then((res) => {
				const { findUser } = res

				if (findUser) {
					const { success, data } = findUser

					success && setRows(data)
				}
			})
			.catch((res) =>
				setSnackbarStatus({
					state: 'error',
					message: '网络连接失败或服务器无响应',
				})
			)
	}, [])

	return (
		<div className="h-full flex flex-col p-2">
			<section className="h-3rem flex justify-end items-center">
				<Button variant="outlined" onClick={() => setDialogOpen(!dialogOpen)}>
					新增用户
				</Button>

				<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
					<div className="p-8 flex flex-col">
						<Typography>创建用户</Typography>

						{columns.map(
							(column, index) =>
								index < columns.length - 1 && (
									<div className="my-2 flex items-center" key={column.field}>
										<Typography className="min-w-3rem pr-2">{column.headerName}</Typography>

										<TextField size="small" onChange={(e) => setUser({ ...user, [column.field]: e.target.value })} />
									</div>
								)
						)}

						<div className="flex justify-end">
							<Button variant="outlined" onClick={() => setDialogOpen(false)} sx={{ mr: '1rem' }}>
								取消
							</Button>

							<Button variant="outlined" onClick={createUser}>
								确定
							</Button>
						</div>
					</div>
				</Dialog>
			</section>

			<section className="flex-grow">
				<Table columns={columns} rows={rows} />
			</section>

			<section>
				<Snackbar
					open={snackbarStatus.message != ''}
					autoHideDuration={2000}
					onClose={() => setSnackbarStatus({ ...snackbarStatus, message: '' })}
					message={snackbarStatus.message}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<Alert severity={snackbarStatus.state} sx={{ width: '100%' }}>
						{snackbarStatus.message}
					</Alert>
				</Snackbar>
			</section>
		</div>
	)
}

export default UserTable
