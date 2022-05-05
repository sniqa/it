import Table from "../../comps/table/CuzomTable";
import { GridColumns } from "@mui/x-data-grid";
import { Fragment, useState, useMemo, useEffect } from "react";
import { Alert, AlertColor, Button, Dialog, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { _fetch } from "../../apis/fetch";
import { NetType, NetTypeProps } from "@it/types";

interface SnackbarStatus {
	state: AlertColor
	message: string
}

const NetTypeTable = () => {
  const columns: GridColumns = useMemo(
    () => [
      { field: "netTypeName", headerName: "网络类型", flex: 1, editable: true },
      {
        field: "ipStartAddress",
        headerName: "ip开始地址",
        flex: 1,
        editable: true,
      },
      { field: "ipEndAddress", headerName: "ip结束地址", flex: 1 },
      { field: "subnetMask", headerName: "子网掩码", flex: 1 },
      { field: "gateway", headerName: "网关" },
      { field: "dns1", headerName: "DNS1" },
      { field: "dns2", headerName: "DNS2" },
      { field: "ipAmount", headerName: "ip地址个数" },
      { field: "ipUsed", headerName: "已使用" },
      { field: "ipUnUsed", headerName: "未使用" },
      { field: "descript", headerName: "描述" },
      {
        field: "action",
        headerName: "操作",
        align: "center",
        flex: 1,
        headerAlign: "center",
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
  );

  const [rows, setRows] = useState<Array<NetTypeProps>>([]);

  // 消息提示栏
  const [snackbarStatus, setSnackbarStatus] = useState<SnackbarStatus>({
    state: "success",
    message: "",
  });

  // 创建网络类型弹出框
	const [dialogOpen, setDialogOpen] = useState(false)

  // 删除行
  const deleteRow = async (row: NetTypeProps) => {
	const { deleteNetType } = await _fetch({
		deleteNetType: row,
	}).catch((res) =>
		setSnackbarStatus({
			state: 'error',
			message: '网络连接失败或服务器无响应',
		})
	)

	if (deleteNetType) {
		if (deleteNetType.success) {
			setSnackbarStatus({
				state: 'success',
				message: '删除网络类型成功',
			})

			setRows((rows) => rows.filter((oldRow) => oldRow._id != row._id))
		} else {
			setSnackbarStatus({
				state: 'error',
				message: '删除网络类型失败',
			})
		}
	}
  };


  // 临时存储创建用户的数据
	const [netType, setNetType] = useState<NetType>({
		netTypeName: '',
		ipStartAddress: '',
		ipEndAddress: '',
		subnetMask: '',
		gateway: '',
		dns1: '',
		dns2: '',
		descript: ''
	})

  // 创建网络类型
	const createNetType = async () => {
		if (netType.netTypeName === '' || netType.ipStartAddress === '' || netType.subnetMask === '' || netType.gateway === '') {
			return setSnackbarStatus({
				state: 'error',
				message: '[网络类型,ip起始地址,子网掩码,网关]不能为空',
			})
		}

		const { createNetType } = await _fetch({ createNetType: netType }).catch((res) =>
			setSnackbarStatus({
				state: 'error',
				message: '网络连接失败或服务器无响应',
			})
		)

		if (createNetType.success) {
			setSnackbarStatus({
				state: 'success',
				message: '创建用户成功',
			})

			setRows([createNetType.data, ...rows])

			setDialogOpen(false)
		} else {
			setSnackbarStatus({
				state: 'error',
				message: `创建用户失败：${createNetType.errMsg}`,
			})
		}
	}

  // 初始化数据
  useEffect(() => {
    _fetch({ findNetType: {} })
      .then((res) => {
		const { findNetType } = res

		if (findNetType) {
			const { success, data } = findNetType

			success && setRows(data)
		}
		  
	  })
      .catch(() => setSnackbarStatus({
		  state: 'error',
		  message: '网络连接失败或服务器无响应'
	  }));
  }, []);

  return (
    <div className="h-full flex flex-col p-2">
      <section className="h-3rem flex justify-end items-center">
        <Button variant="outlined" onClick={() => setDialogOpen(!dialogOpen)}>新增网络类型</Button>

		<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
					<div className="p-8 flex flex-col">
						<Typography>创建网络类型</Typography>

						<div className="my-2 flex items-center">
							<Typography className="min-w-6rem pr-2">网络类型</Typography>

							<TextField size="small" onChange={(e) => setNetType({ ...netType, netTypeName: e.target.value })} />
						</div>

						<div className="my-2 flex items-center">
							<Typography className="min-w-6rem pr-2">ip起始地址</Typography>

							<TextField size="small" onChange={(e) => setNetType({ ...netType, ipStartAddress: e.target.value })} />
						</div>
						<div className="my-2 flex items-center">
							<Typography className="min-w-6rem pr-2">ip结束地址</Typography>

							<TextField size="small" onChange={(e) => setNetType({ ...netType, ipEndAddress: e.target.value })} />
						</div>
						<div className="my-2 flex items-center">
							<Typography className="min-w-6rem pr-2">子网掩码</Typography>

							<TextField size="small" onChange={(e) => setNetType({ ...netType, subnetMask: e.target.value })} />
						</div>
						<div className="my-2 flex items-center">
							<Typography className="min-w-6rem pr-2">网关</Typography>

							<TextField size="small" onChange={(e) => setNetType({ ...netType, gateway: e.target.value })} />
						</div>

						<div className="my-2 flex items-center">
							<Typography className="min-w-6rem pr-2">DNS1</Typography>

							<TextField size="small" onChange={(e) => setNetType({ ...netType, dns1: e.target.value })} />
						</div>

						<div className="my-2 flex items-center">
							<Typography className="min-w-6rem pr-2">DNS2</Typography>

							<TextField size="small" onChange={(e) => setNetType({ ...netType, dns2: e.target.value })} />
						</div>


						<div className="my-2 flex items-center">
							<Typography className="min-w-6rem pr-2">描述</Typography>

							<TextField size="small" onChange={(e) => setNetType({ ...netType, descript: e.target.value })} />
						</div>

						<div className="flex justify-end">
							<Button variant="outlined" onClick={() => setDialogOpen(false)} sx={{ mr: '1rem' }}>
								取消
							</Button>

							<Button variant="outlined" onClick={createNetType}>
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

export default NetTypeTable;
