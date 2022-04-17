import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'

const MONGODB_DB_NAME = 'itserver'



const mongoConnection = async () => {

  const client = await MongoClient.connect(url)

  const db = client.db(MONGODB_DB_NAME)
  
  return db
  
}

export default await mongoConnection()
