import path from 'path'
import { __dirname } from './share'

export const QUERY_SERVER_PORT = 9072

export const IMAGE_STATIC_SERVER_PORT = 9073

export const DOCUMENT_STATIC_SERVER_PORT = 9074

export const WEBSOCKET_SERVER_PORT = 9075

// 静态服务器请求路径
export const STATIC_SERVER_POST_PATH = '/upload'

// 图片存储路径
export const IMAGE_STORE_STATIC_PATH = path.join(__dirname, '../public/image')

// 文档存储路径
export const DOCUMENT_STORE_STATIC_PATH = path.join(__dirname, '../public/document')
