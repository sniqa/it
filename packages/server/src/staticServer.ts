import Koa from 'koa'
import koaStatic from 'koa-static'
import Router from 'koa-router'
import koaBody from 'koa-body'
import cors from 'koa-cors'
import path from 'path'
import { fileURLToPath } from 'url'

// ES module __dirname
const __filename = fileURLToPath(import.meta.url)

export const __dirname = path.dirname(__filename)

const koaStaticGen = (uploadDir: string) =>
	koaBody({
		multipart: true,
		formidable: {
			uploadDir,
			keepExtensions: true,
			onFileBegin: () => {},
		},
	})

interface StaticServer {
	port: number
	uploadDir: string
	postPath: string
	routerPath: string
	callback?: () => void
}

const staticServer = (info: StaticServer) => {
	const { port, uploadDir, postPath, routerPath, callback = () => {} } = info

	const app = new Koa()

	const router = new Router()

	app.use(cors())

	router.post(postPath, koaStaticGen(uploadDir), async (ctx) => {
		const { request, response } = ctx

		const { files, host, protocol } = request

		const hostpath = `${protocol}://${host}${routerPath}`

		if (files) {
			// file 为 FromData的append函数所添加的key值，是自定义值
			const { file } = files

			// response.body = 'ok'
			response.body =
				file && Array.isArray(file)
					? file.map((f) => ({
							filepath: `${hostpath}/${path.basename(f.path)}`,
					  }))
					: {
							filepath: `${hostpath}/${path.basename(file.path)}`,
					  }
		}
	})

	app.use(router.routes())

	app.use(router.allowedMethods())

	app.use(koaStatic(path.join(__dirname, '../public')))

	app.listen(port, () => callback())

	return app
}

export default staticServer
