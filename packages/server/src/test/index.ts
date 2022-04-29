import ip from 'ip';
import { getDocuments } from '../controller/document'

const one = ip.toLong('192.168.1.1')
const two = ip.toLong('192.168.2.54')





// assert.equal(res, data, 'fs')
console.log(await getDocuments());
