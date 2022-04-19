import Koa from 'koa'
import koaStatic from 'koa-static'
import Router from 'koa-router'
import koaBody from 'koa-body'
import path from 'path'
import { fileURLToPath } from 'url'

// ES module __dirname
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = new Koa()

const port = 8081

const router = new Router()

router.post(
	'/upload',
	koaBody({
		multipart: true,
		formidable: {
			uploadDir: path.join(__dirname, '../public'),
			keepExtensions: true,
			onFileBegin: () => {},
		},
	}),
	async (ctx) => {
		const { request, response } = ctx

		const { files } = request

		if (files) {
			if (Array.isArray(files)) {
				files[0].path
			} else {
			}
		}

		response.body = 'ok'
	}
)

app.use(router.routes())

app.use(router.allowedMethods())

app.use(koaStatic(path.join(__dirname, '../public')))

app.listen(port)

console.log(`static server run at localhost:${port}`)
