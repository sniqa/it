import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RoutePath } from './router'
import TopContent from './comps/layouts/TopContent'
import Header from './comps/common/Header'
import Home from './views/Home'
import About from './views/About'
import NotFound from './views/NotFound'
import Loading from './views/Loading'

const Documentation = lazy(() => import('./views/Documentation'))
const DocumentEditor = lazy(() => import('./views/Editor'))
const NetManage = lazy(() => import('./views/NetManage'))

const User = lazy(() => import('./views/netManageSubpages/User'))
const NetType = lazy(() => import('./views/netManageSubpages/NetType'))
const Ip = lazy(() => import('./views/netManageSubpages/Ip'))
const Plan = lazy(() => import('./views/netManageSubpages/Plan'))

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={RoutePath.ROOT}
					element={<TopContent header={<Header />} />}
				>
					<Route index element={<Navigate to={RoutePath.HOME} replace />} />
					<Route path={RoutePath.HOME} element={<Home />} />
					<Route path={RoutePath.ABOUT} element={<About />} />

					<Route
						path={RoutePath.DOCUMENT}
						element={
							<Suspense fallback={<Loading />}>
								<Documentation />
							</Suspense>
						}
					/>

					<Route
						path={RoutePath.EDITOR}
						element={
							<Suspense fallback={<Loading />}>
								<DocumentEditor />
							</Suspense>
						}
					/>

					{/* 网络管理 */}
					<Route
						path={RoutePath.NET_MANAGE}
						element={
							<Suspense fallback={<Loading />}>
								<NetManage />
							</Suspense>
						}
					>
						<Route
							index
							element={
								<Suspense fallback={<Loading />}>
									<User />
								</Suspense>
							}
						/>
						<Route
							path={RoutePath.USER}
							element={
								<Suspense fallback={<Loading />}>
									<User />
								</Suspense>
							}
						/>
						<Route
							path={RoutePath.NET_TYPE}
							element={
								<Suspense fallback={<Loading />}>
									<NetType />
								</Suspense>
							}
						/>
						<Route
							path={RoutePath.IP}
							element={
								<Suspense fallback={<Loading />}>
									<Ip />
								</Suspense>
							}
						/>
						<Route
							path={RoutePath.PLAN}
							element={
								<Suspense fallback={<Loading />}>
									<Plan />
								</Suspense>
							}
						/>
					</Route>

					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
