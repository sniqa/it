import Koa from 'koa'
import koaStatic from 'koa-static'
import Router from 'koa-router'
import koaBody from 'koa-body'
import cors from 'koa-cors'
import path from 'path'
import { fileURLToPath } from 'url'

// ES module __dirname
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const port = 8081

const imagePath = '/image'

const staticPath = path.join(__dirname, '../public/image')

const koaStaticGen = () =>
	koaBody({
		multipart: true,
		formidable: {
			uploadDir: staticPath,
			keepExtensions: true,
			onFileBegin: () => {},
		},
	})

const app = new Koa()

app.use(cors())

const router = new Router()

router.post('/upload', koaStaticGen(), async (ctx) => {
	const { request, response } = ctx

	const { files, host, url, protocol } = request

	const hostpath = `${protocol}://${host}${imagePath}`

	if (files) {
		const { file } = files

		if (file) {
			if (Array.isArray(file)) {
				return (response.body = file.map((f) => ({ filepath: `${hostpath}/${path.basename(f.path)}` })))
			}

			return (response.body = { filepath: `${hostpath}/${path.basename(file.path)}` })
		}
	}
})

app.use(router.routes())

app.use(router.allowedMethods())

app.use(koaStatic(path.join(__dirname, '../public')))

app.listen(port)

console.log(`static server run at localhost:${port}`)
