import { lazy, Suspense } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import About from './views/About'

const App = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>...Loading</div>}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
