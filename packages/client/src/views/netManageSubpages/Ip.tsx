import Table from "../../comps/table/CuzomTable";
import { GridColumns } from "@mui/x-data-grid";
import { Fragment, useState, useMemo, useEffect } from "react";
import { Alert, AlertColor, Button, IconButton, MenuItem, Select, Snackbar, Typography, Dialog, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { _fetch } from "../../apis/fetch";
import { NetTypeProps, IpAddress, IpAddressProps, UserProps } from "@it/types";
import { lightGreen } from "@mui/material/colors";

interface SnackbarStatus {
	state: AlertColor
	message: string
}

const Ip = () => {
  const columns: GridColumns = useMemo(
    () => [
		{
			field: "ipAddress",
			headerName: "ip地址",
			flex: 1,
		},
		{ field: "netTypeName", headerName: "网络类型", flex: 1, editable: true },
      { field: "used", headerName: "已使用", flex: 1 },
      { field: "account", headerName: "使用人", flex: 1 },
      { field: "descript", headerName: "描述" },
      {
        field: "action",
        headerName: "操作",
        align: "center",
        flex: 1,
        headerAlign: "center",
        renderCell: (params) => (
         <Fragment>
			 <Button onClick={() => {}} disabled={!params.row.used} size={'small'}>
             回收
            </Button>
			<Button onClick={() => {
				setDialogOpen(true)
				setCurrentIp(params.row)
			}} 
			disabled={params.row.used} size={'small'}>
			 分配
            </Button>
		 </Fragment>
        ),
      },
    ],
    []
  );

	// 显示行
  const [rows, setRows] = useState<Array<IpAddressProps>>([]);

	// 所有的ip地址
	const [allIps, setAllIps] = useState<Array<IpAddressProps>>([]);

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
	  ipUnUsed: 0
  })


	// 当前选择的ip地址
  const [currentIp, setCurrentIp] = useState<IpAddressProps>({
	  _id: '',
	  ipAddress: '',
	  used: false,
	  netTypeName: ''
  })

	// 当前选中的用户
  const [currentUser, setCurrentUser] = useState<UserProps>({
	  _id: '',
	  account: '',
	  fullname: ''
  })

  // 消息提示栏
  const [snackbarStatus, setSnackbarStatus] = useState<SnackbarStatus>({
    state: "success",
    message: "",
  });


  	// 分配ip弹出框
	const [dialogOpen, setDialogOpen] = useState(false)

  const assignIp = async () => {
	  
	 const { assignIp } = await _fetch({ assignIp: {
		 ...currentIp, ...currentUser
	 } }).catch(res => setSnackbarStatus({
		state: "error",
		message: "网络连接失败或服务器无响应",
	  }))

	  if(assignIp) {
		  const { success, data } = assignIp

		  if(success) {
			  const { ipInfo, netTypeInfo } = data

				setAllIps(allIps.map(ip => ip._id === ipInfo._id ? ipInfo : ip))

				setAllNetTypes(allNetTypes.map(netType => netType._id === netTypeInfo._id ? netTypeInfo : netType))

				setRows(rows.map(row => row._id === ipInfo._id ? ipInfo : row))

				setCurrentNetType(netTypeInfo)

				setDialogOpen(false)
				
		  }

	  }
	  
  }

  // 初始化数据
  useEffect(() => {
    _fetch({ findIp: {}, findNetType: {}, findUser: {} })
      .then((res) => {
		const { findIp, findNetType, findUser } = res

		if(findUser) {
			const { success, data } = findUser

			success && setAllUsers(data)
		}

		if(findNetType) {
			const { success, data } = findNetType

			success && setAllNetTypes(data)
		}

		if (findIp) {
			const { success, data } = findIp

			success && setAllIps(data), setRows(data.filter((row: IpAddress) => row.netTypeName === findNetType.data[0].netTypeName))
		}
		  
	  })
      .catch(() => setSnackbarStatus({
		  state: 'error',
		  message: '网络连接失败或服务器无响应'
	  }));
  }, []);

  return (
    <div className="h-full flex flex-col p-2">
      <section className="h-6rem flex items-center flex-wrap">

		<div className="flex items-center w-14rem">
        	<Typography className="w-6rem">{`网络类型:`}</Typography>
			<Select
				size="small"
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={currentNetType.netTypeName || (allNetTypes[0] && allNetTypes[0].netTypeName) || ''}
				onChange={(e) => {
					const currnetNetTypeName = e.target.value

					setCurrentNetType(allNetTypes.find(netType => netType.netTypeName === currnetNetTypeName) as NetTypeProps)

					setRows(allIps.filter(row => row.netTypeName === currnetNetTypeName))
				}}
				>
				{allNetTypes.map((netType) => (<MenuItem value={netType.netTypeName} key={netType._id}>{netType.netTypeName}</MenuItem>))}
				
			</Select>
		</div>
        <Typography className="w-14rem text-0.8rem">{`ip起始地址: ${currentNetType.ipStartAddress || (allNetTypes[0] && allNetTypes[0].ipStartAddress)}`}</Typography>
        <Typography className="w-14rem">{`ip结束地址: ${currentNetType.ipEndAddress || (allNetTypes[0] && allNetTypes[0].ipEndAddress)}`}</Typography>
        <Typography className="w-14rem">{`子网掩码: ${currentNetType.subnetMask || (allNetTypes[0] && allNetTypes[0].subnetMask)}`}</Typography>
        <Typography className="w-14rem">{`网关: ${currentNetType.gateway || (allNetTypes[0] && allNetTypes[0].gateway)}`}</Typography>
        <Typography className="w-14rem">{`DNS1: ${currentNetType.dns1 || (allNetTypes[0] && allNetTypes[0].dns1)}`}</Typography>
        <Typography className="w-14rem">{`DNS2: ${currentNetType.dns2 || (allNetTypes[0] && allNetTypes[0].dns2)}`}</Typography>
        <Typography className="w-14rem">{`ip地址总个数: ${currentNetType.ipAmount || (allNetTypes[0] && allNetTypes[0].ipAmount)}`}</Typography>
        <Typography className="w-14rem">{`已使用: ${currentNetType.ipUsed || (allNetTypes[0] && allNetTypes[0].ipUsed)}`}</Typography>
        <Typography className="w-14rem">{`未使用: ${currentNetType.ipUnUsed || (allNetTypes[0] && allNetTypes[0].ipUnUsed)}`}</Typography>

		<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
					<div className="p-8 flex flex-col">
						<Typography className="text-blue-500 text-3rem">分配ip</Typography>

						<div className="flex items-center my-2">
							<Typography  className="min-w-4rem ">将:</Typography>
							<Typography className="border py-2 px-4 rounded min-w-12rem">{currentIp.ipAddress}</Typography>
						</div>
						
						<div className="flex items-center my-2 mb-4">
							<Typography className="min-w-4rem">分配给</Typography>
							<Select 
								size="small"
								className="min-w-12rem"
								value={currentUser.fullname} onChange={(e) => setCurrentUser(allUsers.find(user => user.fullname === e.target.value) as UserProps)}>
								{ allUsers.map(user => <MenuItem value={user.fullname} key={user._id}>{user.fullname}</MenuItem>)}
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
          open={snackbarStatus.message != ""}
          autoHideDuration={2000}
          onClose={() => setSnackbarStatus({ ...snackbarStatus, message: "" })}
          message={snackbarStatus.message}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity={snackbarStatus.state} sx={{ width: "100%" }}>
            {snackbarStatus.message}
          </Alert>
        </Snackbar>
      </section>
    </div>
  );
};

export default Ip
