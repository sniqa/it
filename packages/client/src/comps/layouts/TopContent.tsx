import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

interface TopContentProps {
	header: JSX.Element
}

// 上下头部和内容布局
const TopContent = ({ header }: TopContentProps) => {
	return (
		<Fragment>
			{header}

			<Outlet />
		</Fragment>
	)
}

export default TopContent
