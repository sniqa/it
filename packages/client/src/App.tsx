import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RoutePath } from './router'
import TopContent from './comps/layouts/TopContent'
import Header from './comps/common/Header'
import Home from './views/Home'
import About from './views/About'
import NotFound from './views/NotFound'

const Documentation = lazy(() => import('./views/Documentation'))
const DocumentEditor = lazy(() => import('./views/Editor'))

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
							<Suspense fallback={<div>...Loading</div>}>
								<Documentation />
							</Suspense>
						}
					/>

					<Route
						path={RoutePath.EDITOR}
						element={
							<Suspense fallback={<div>...Loading</div>}>
								<DocumentEditor />
							</Suspense>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
