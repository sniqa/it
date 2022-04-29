import path from "path"
import fs from 'fs'
import ip from 'ip'
import { __dirname } from '../share' 
import { DOCUMENT_STATIC_SERVER_PORT } from '../serverConfig'
import { trueRes } from "../error"

const documentStaticPath = path.join(__dirname, '../../public/document')

export const getDocuments = async () => {
    
    const filenames = fs.readdirSync(documentStaticPath)

    const localhost = ip.address()

    const newFilenames = filenames.map(dir => `http://${localhost}:${DOCUMENT_STATIC_SERVER_PORT}/document/${dir}`)

    return trueRes(newFilenames)
}