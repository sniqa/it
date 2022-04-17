import { ParameterizedContext } from 'koa'
import Router, { IRouterParamContext } from 'koa-router'
import * as netType from './controller/netType'
import * as user from './controller/user'
import { falseRes, REQUIRED_JSON, UNKOWN_ERROR } from './error'
import { dispatch, regeister } from './jsonRouter'
import { isObject } from './share'

regeister({
	test: () => 'hello',
	...netType,
	...user,
})

const router = new Router()

// router.get('/gateway', (ctx) => gateway(ctx))
router.post('/gateway', async (ctx) => (ctx.response.body = await gateway(ctx).catch((err) => console.log(err))))

router.get('/test', (ctx) => (ctx.response.body = 'Hello, this is test of router test'))

export const gateway = async (ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>) => {
	const { body } = ctx.request

	if (isObject(body)) {
		return await dispatch(body).catch((err) => {
			console.log(err)
			return falseRes(UNKOWN_ERROR)
		})
	} else {
		return falseRes(REQUIRED_JSON)
	}
}

export default router
