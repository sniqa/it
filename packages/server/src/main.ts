import staticServer, { __dirname } from './staticServer'
import queryServer from './queryServer'
import wsServer from './wsServer'
import router from './router/router'
import {
	QUERY_SERVER_PORT,
	IMAGE_STATIC_SERVER_PORT,
	DOCUMENT_STATIC_SERVER_PORT,
	WEBSOCKET_SERVER_PORT,
	STATIC_SERVER_POST_PATH,
	IMAGE_STORE_STATIC_PATH,
	DOCUMENT_STORE_STATIC_PATH,
} from './serverConfig'

import { dispatch } from './router/jsonRouter'

// 请求服务器
queryServer({
	port: QUERY_SERVER_PORT,
	router,
	callback: () => console.log(`query server run at localhost:${QUERY_SERVER_PORT}`),
})

// webSocket服务器
wsServer({
	port: WEBSOCKET_SERVER_PORT,
	callback: async (ws, data) => {
		const res = await dispatch(data)

		ws.send(JSON.stringify(res))
	},
})

// 图片静态服务器
staticServer({
	port: IMAGE_STATIC_SERVER_PORT,
	postPath: STATIC_SERVER_POST_PATH,
	uploadDir: IMAGE_STORE_STATIC_PATH,
	routerPath: '/image',
	callback: () => console.log(`image server run at localhost:${IMAGE_STATIC_SERVER_PORT}`),
})

// 文档静态服务器
staticServer({
	port: DOCUMENT_STATIC_SERVER_PORT,
	postPath: STATIC_SERVER_POST_PATH,
	uploadDir: DOCUMENT_STORE_STATIC_PATH,
	routerPath: '/document',
	callback: () => console.log(`document server run at localhost:${DOCUMENT_STATIC_SERVER_PORT}`),
})
