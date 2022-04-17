import Koa from 'koa'
import bodyParser from 'koa-body'
import cors from 'koa-cors'
import router from './router'

const port = 8080

const app = new Koa()

app.use(cors())

app.use(bodyParser())

app.use(router.routes())

app.use(router.allowedMethods())

app.listen(port)

console.log(`server run at http://localhost:${port}`)
