import { falseRes, MISSING_PARAMS } from './../error/index'
import { hasKeys } from './../share/share'
import path from 'path'
import fs from 'fs'
import ip from 'ip'
import { __dirname } from '../share'
import { DOCUMENT_STATIC_SERVER_PORT } from '../serverConfig'
import { trueRes } from '../error'
import { Documentation } from '@it/types'
import MongoDb from '../mongodb'

const documentStaticPath = path.join(__dirname, '../../public/document')

const DOCUMENTS_COLLECTION_NAME = 'documents'

const DocumentsModel = MongoDb.collection<Documentation>(DOCUMENTS_COLLECTION_NAME)

// 创建新文档
export const createDocument = async (data: Documentation) => {
	if (!hasKeys(data, 'title', 'content')) {
		return falseRes(MISSING_PARAMS)
	}

	const now = new Date().toString()

	data.createDate = now
	data.lastModifyDate = now
	data.recycle = false

	const doc = await DocumentsModel.findOne((await DocumentsModel.insertOne(data)).insertedId)

	return trueRes(doc)
}

export const getDocuments = async () => {
	const filenames = fs.readdirSync(documentStaticPath)

	const localhost = ip.address()

	const newFilenames = filenames.map((dir) => `http://${localhost}:${DOCUMENT_STATIC_SERVER_PORT}/document/${dir}`)

	return trueRes(newFilenames)
}
