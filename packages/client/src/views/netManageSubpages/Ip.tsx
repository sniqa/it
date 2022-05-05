import Table from '../../comps/table/CuzomTable'
import { GridColumns } from '@mui/x-data-grid'
import { Fragment, useState, useMemo, useEffect } from 'react'
import {
	Alert,
	AlertColor,
	Button,
	IconButton,
	MenuItem,
	Select,
	Snackbar,
	Typography,
	Dialog,
	TextField,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { _fetch } from '../../apis/fetch'
import { NetTypeProps, IpAddress, IpAddressProps, UserProps } from '@it/types'
import { lightGreen } from '@mui/material/colors'

interface SnackbarStatus {
	state: AlertColor
	message: string
}

const Ip = () => {
	// 当前在线的ip
	const [online, setOnline] = useState<Array<string>>([])

	// 列的属性
	const columns: GridColumns = useMemo(
		() => [
			{
				field: 'ipAddress',
				headerName: 'ip地址',
				flex: 1,
				color: 'primary',
				renderCell: (params) => (
					<Typography className={online.includes(params.row.ipAddress) ? 'text-blue-600' : ''}>
						{params.row.ipAddress}
					</Typography>
				),
			},
			{ field: 'netTypeName', headerName: '网络类型', flex: 1, editable: true },
			{ field: 'used', headerName: '已使用', flex: 1 },
			{ field: 'account', headerName: '账号', flex: 1 },
			{ field: 'fullname', headerName: '使用人', flex: 1 },
			{ field: 'descript', headerName: '描述' },
			{
				field: 'action',
				headerName: '操作',
				align: 'center',
				flex: 1,
				headerAlign: 'center',
				renderCell: (params) => (
					<Fragment>
						<Button
							onClick={() => {
								setCurrentIp(params.row)
								recycleIp(params.row)
							}}
							disabled={!params.row.used}
							size={'small'}
						>
							回收
						</Button>
						<Button
							onClick={() => {
								setDialogOpen(true)
								setCurrentIp(params.row)
							}}
							disabled={params.row.used}
							size={'small'}
						>
							分配
						</Button>
					</Fragment>
				),
			},
		],
		[]
	)

	// 显示行的属性
	const [rows, setRows] = useState<Array<IpAddressProps>>([])

	// 所有的ip地址
	const [allIps, setAllIps] = useState<Array<IpAddressProps>>([])

	// 所有的网络类型
	const [allNetTypes, setAllNetTypes] = useState<Array<NetTypeProps>>([])

	// 所有的用户
	const [allUsers, setAllUsers] = useState<Array<UserProps>>([])

	// 当前选择的网络类型
	const [currentNetType, setCurrentNetType] = useState<NetTypeProps>({
		_id: '',
		netTypeName: '',
		ipStartAddress: '',
		ipEndAddress: '',
		subnetMask: '',
		gateway: '',
		dns1: '',
		dns2: '',
		ipAmount: 0,
		ipUsed: 0,
		ipUnUsed: 0,
	})

	// 当前选择的ip地址
	const [currentIp, setCurrentIp] = useState<IpAddressProps>({
		_id: '',
		ipAddress: '',
		used: false,
		netTypeName: '',
	})

	// 当前选中的用户
	const [currentUser, setCurrentUser] = useState<UserProps>({
		_id: '',
		account: '',
		fullname: '',
	})

	// 消息提示栏
	const [snackbarStatus, setSnackbarStatus] = useState<SnackbarStatus>({
		state: 'success',
		message: '',
	})

	// 分配ip弹出框
	const [dialogOpen, setDialogOpen] = useState(false)

	// 分配ip
	const assignIp = async () => {
		const { assignIp } = await _fetch({
			assignIp: {
				...currentUser,
				...currentIp,
			},
		}).catch((res) =>
			setSnackbarStatus({
				state: 'error',
				message: '网络连接失败或服务器无响应',
			})
		)

		if (assignIp) {
			const { success, data } = assignIp

			if (success) {
				const { ipInfo, netTypeInfo } = data

				setAllIps((oldAllIps) => oldAllIps.map((ip) => (ip._id === ipInfo._id ? ipInfo : ip)))

				setAllNetTypes((oldAllNetTypes) =>
					oldAllNetTypes.map((netType) => (netType._id === netTypeInfo._id ? netTypeInfo : netType))
				)

				setRows((oldRows) => oldRows.map((row) => (row._id === ipInfo._id ? ipInfo : row)))

				setCurrentNetType(netTypeInfo)

				setDialogOpen(false)
			}
		}
	}

	// 回收ip
	const recycleIp = async (row: UserProps) => {
		const { recycleIp } = await _fetch({ recycleIp: row }).catch((res) =>
			setSnackbarStatus({
				state: 'error',
				message: '网络连接失败或服务器无响应',
			})
		)

		if (recycleIp) {
			const { success, data } = recycleIp

			if (success) {
				const { ipInfo, netTypeInfo } = data

				setAllNetTypes((oldAllNetTypes) =>
					oldAllNetTypes.map((netType) => (netType._id === netTypeInfo._id ? netTypeInfo : netType))
				)

				setCurrentNetType(netTypeInfo)

				setAllIps((oldAllIps) => oldAllIps.map((ip) => (ip._id === ipInfo._id ? ipInfo : ip)))

				setRows((oldRows) => oldRows.map((row) => (row._id === ipInfo._id ? ipInfo : row)))
			}
		}
	}

	// 初始化数据
	useEffect(() => {
		_fetch({ findIp: {}, findNetType: {}, findUser: {} })
			.then((res) => {
				const { findIp, findNetType, findUser } = res

				try {
					if (findUser) {
						const { success, data } = findUser

						success && setAllUsers(data)
					}

					if (findNetType) {
						const { success, data } = findNetType
						console.log(data)

						success && setAllNetTypes(data), setCurrentNetType(data[0])
					}

					if (findIp) {
						const { success, data } = findIp

						success && setAllIps(data),
							setRows(data.filter((row: IpAddress) => row.netTypeName === findNetType.data[0].netTypeName))
					}
				} catch {
					setSnackbarStatus({
						state: 'error',
						message: '没有数据,请先建立用户列表和网络类型列表',
					})
				}
			})
			.catch((res) =>
				setSnackbarStatus({
					state: 'error',
					message: '网络连接失败或服务其无响应',
				})
			)
	}, [])

	return (
		<div className="h-full flex flex-col p-2">
			<section className="flex items-center flex-wrap pt-2 pb-4 px-4">
				<div className="h-full flex flex-wrap">
					<div className="flex items-center w-14rem">
						<Typography className="w-6rem">{`网络类型:`}</Typography>
						<Select
							size="small"
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={currentNetType.netTypeName || ''}
							onChange={(e) => {
								const currnetNetTypeName = e.target.value || ''

								setCurrentNetType(
									allNetTypes.find((netType) => netType.netTypeName === currnetNetTypeName) as NetTypeProps
								)

								setRows(allIps.filter((row) => row.netTypeName === currnetNetTypeName))
							}}
						>
							{allNetTypes.map((netType) => (
								<MenuItem value={netType.netTypeName} key={netType._id} className={`text-blue-500`}>
									{netType.netTypeName}
								</MenuItem>
							))}
						</Select>
					</div>

					<div className="w-14rem flex items-center">
						ip起始地址:
						<span className="text-blue-700 px-2">{currentNetType.ipStartAddress}</span>
					</div>

					<div className="w-14rem rounded flex items-center">
						ip结束地址:
						<span className="text-blue-700 px-2">{currentNetType.ipEndAddress}</span>
					</div>
					<div className="w-14rem flex items-center">
						子网掩码:
						<span className="text-blue-700 px-2">{currentNetType.subnetMask}</span>
					</div>
					<div className="w-14rem flex items-center">
						网关:
						<span className="text-blue-700 px-2">{currentNetType.gateway}</span>
					</div>
					<div className="w-14rem flex items-center">
						DNS1:
						<span className="text-blue-700 px-2">{currentNetType.dns1}</span>
					</div>
					<div className="w-14rem flex items-center">
						DNS2:
						<span className="text-blue-700 px-2">{currentNetType.dns2}</span>
					</div>
					<div className="w-14rem flex items-center">
						ip地址总个数:
						<span className="text-blue-700 px-2">{currentNetType.ipAmount}</span>
					</div>

					<div className="w-14rem flex items-center">
						已使用:
						<span className="text-blue-700 px-2">{currentNetType.ipUsed}</span>
					</div>

					<div className="w-14rem flex items-center">
						未使用:
						<span className="text-blue-700 px-2">{currentNetType.ipUnUsed}</span>
					</div>
				</div>

				<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
					<div className="p-8 flex flex-col">
						<Typography className="text-blue-700 text-3rem">分配ip</Typography>

						<div className="flex items-center my-2">
							<Typography className="min-w-4rem ">将:</Typography>
							<Typography className="border py-2 px-4 rounded min-w-12rem">{currentIp.ipAddress}</Typography>
						</div>

						<div className="flex items-center my-2 mb-4">
							<Typography className="min-w-4rem">分配给</Typography>
							<Select
								size="small"
								className="min-w-12rem"
								value={currentUser.fullname}
								onChange={(e) => setCurrentUser(allUsers.find((user) => user.fullname === e.target.value) as UserProps)}
							>
								{allUsers.map((user) => (
									<MenuItem value={user.fullname} key={user._id}>
										{user.fullname}
									</MenuItem>
								))}
							</Select>
						</div>

						<div className="flex justify-end">
							<Button variant="outlined" onClick={() => setDialogOpen(false)} sx={{ mr: '1rem' }}>
								取消
							</Button>

							<Button variant="outlined" onClick={assignIp}>
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

export default Ip
