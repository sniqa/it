import { Button, Divider } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { RoutePath } from '../router'

const subNav = [
	{ title: '用户', to: RoutePath.USER },
	{ title: '网络类型', to: RoutePath.NET_TYPE },
	{ title: 'ip', to: RoutePath.IP },
	{ title: '计划任务', to: RoutePath.PLAN },
]

const NetManage = () => {
	const navigate = useNavigate()

	return (
		<div className="flex-grow flex py-2 px-4">
			<section className="border w-18rem h-full bg-light-50 rounded-2xl">
				{subNav.map((nav) => (
					<Button
						fullWidth
						sx={{ mb: '1rem' }}
						onClick={() => navigate(nav.to)}
						key={nav.title}
					>
						{nav.title}
					</Button>
				))}
			</section>

			<section className="flex-grow rounded-2xl ml-2 bg-light-50">
				<Outlet />
			</section>
		</div>
	)
}

export default NetManage
