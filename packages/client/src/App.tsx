import { lazy, Suspense } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { RoutePath } from './router'

import Home from './views/Home'
import About from './views/About'
import DocumentEditor from './comps/documentation/DocumentEditor'

const Documentation = lazy(() => import('./views/Documentation'))

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={RoutePath.ROOT} element={<Home />} />
				<Route path={RoutePath.ABOUT} element={<About />} />

				<Route
					path={RoutePath.DOCUMENTATION}
					element={
						<Suspense fallback={<div>...Loading</div>}>
							<Documentation />
						</Suspense>
					}
				/>

				<Route path="test" element={<DocumentEditor />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
