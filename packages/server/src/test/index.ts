import ip from 'ip';
import { createNetType, type NetType } from '../controller/netType';



const one = ip.toLong('192.168.1.1')
const two = ip.toLong('192.168.2.54')

console.log(two - one);

const data: NetType = {
  netTypeName: 'world',
  startIpAddress: '192.168.1.2',
  endIpAddress: '192.168.1.253',
  netmask: '255.255.255.0',
  gateway: '192.168.1.1',
  used: 0,
  unused: 0,
}

const res = await createNetType(data)

data.unused = 253 - 2

// assert.equal(res, data, 'fs')
console.log(res);
