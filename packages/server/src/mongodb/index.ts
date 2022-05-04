import { MongoClient } from 'mongodb'

const MONGO_PORT = 27017

const MONGO_URL = `mongodb://localhost:${MONGO_PORT}`

const MONGO_DB_NAME = 'it'

const mongoClient = new MongoClient(MONGO_URL)

const connect = async () => {
	const res = await mongoClient.connect()

	res
		? console.log(`connect MongoDb with port: ${MONGO_PORT} successful`)
		: console.log(`connect MongoDb with port: ${MONGO_PORT} faild`)

	const db = mongoClient.db(MONGO_DB_NAME)

	return db
}

export default await connect()
