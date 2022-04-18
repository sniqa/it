import { Button, Paper } from '@mui/material'
import { useCallback } from 'react'
import { useLocation, useMatch, useNavigate } from 'react-router-dom'
import { RoutePath } from '../../router'

interface Nav {
	id: number
	title: string
	to: string
}

const navs: Array<Nav> = [
	{ id: 1, title: 'Home', to: RoutePath.ROOT_HOME },
	{ id: 2, title: 'NetManage', to: RoutePath.ROOT_NET_MANAGE },
	{ id: 3, title: 'Document', to: RoutePath.ROOT_DOCUMENT },
	{ id: 4, title: 'About', to: RoutePath.ROOT_ABOUT },
]

const Header = () => {
	const navigate = useCallback(useNavigate(), [])

	const location = useLocation()

	return (
		<header className="flex h-4rem w-full justify-between items-center border bg-light-50">
			<section></section>

			<section>
				{navs.map((nav) => (
					<Button
						disableElevation
						variant={location.pathname.includes(nav.to) ? 'contained' : 'text'}
						onClick={() => navigate(nav.to)}
						key={nav.id}
					>
						{nav.title}
					</Button>
				))}
			</section>
		</header>
	)
}

export default Header
