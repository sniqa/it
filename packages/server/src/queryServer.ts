import Koa from 'koa'
import bodyParser from 'koa-body'
import cors from 'koa-cors'
import Router from 'koa-router'


interface QueryServer {
    port: number,
    router: Router<any, {}>
    callback?: () => void
}

const queryServer = (info: QueryServer) => {

    const {port, router, callback = () => {}} = info

    const app = new Koa()

    app.use(cors())
    
    app.use(bodyParser())
    
    app.use(router.routes())
    
    app.use(router.allowedMethods())
    
    app.listen(port, () => callback())

    return app
}

export default queryServer