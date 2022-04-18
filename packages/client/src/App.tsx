import { lazy, Suspense } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { RoutePath } from './router'

import Home from './views/Home'
import About from './views/About'
import DocumentEditor from './comps/documentation/DocumentEditor'
import DocumentDetails from './comps/documentation/DocumentDetails'

const Documentation = lazy(() => import('./views/Documentation'))

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={RoutePath.ROOT} element={<Home />} />
				<Route path={RoutePath.ABOUT} element={<About />} />

				<Route
					path={RoutePath.DOCUMENT}
					element={
						<Suspense fallback={<div>...Loading</div>}>
							<Documentation />
						</Suspense>
					}
				/>

				<Route path="test" element={<DocumentEditor />} />
				<Route path="test1" element={<DocumentDetails />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
