import path from 'path'
import staticServer, { __dirname } from './staticServer'

const imageStaticPath = path.join(__dirname, '../public/image')
const imageStaticServerPort = 9073

const documentStaticPath = path.join(__dirname, '../public/document')
const documentStaticServerPort = 9074

const postPath = '/upload'

// 图片静态服务器
staticServer({
	port: imageStaticServerPort,
	postPath,
	uploadDir: imageStaticPath,
	routerPath: '/image',
	callback: () =>
		console.log(`image server run at localhost:${imageStaticServerPort}`),
})

// 文档静态服务器
staticServer({
	port: documentStaticServerPort,
	postPath,
	uploadDir: documentStaticPath,
	routerPath: '/document',
	callback: () =>
		console.log(`document server run at localhost:${documentStaticServerPort}`),
})
