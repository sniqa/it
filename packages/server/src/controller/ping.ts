import ping from 'ping'
import { NetTypeProps } from '@it/types'
import { IpAddressModel } from './ipAddress'
import { hasKeys } from '@it/share'
import { falseRes, MISSING_PARAMS } from '../error'

const pingHostRange = async (hosts: Array<string>) => {
  const allHostInfo = await Promise.all(
    hosts.map(async (host) => {
      const res = await ping.promise.probe(host, {
        timeout: 10,
        extra: ['-i', '2'],
      })

      return { host: res.host, online: res.alive }
    })
  )

  return allHostInfo.filter((host) => host.online)
}

export const getHostsOnline = async (data: Partial<NetTypeProps>) => {
  if (!hasKeys(data, 'netTypeName')) {
    return falseRes(MISSING_PARAMS)
  }

  const { netTypeName } = data

  const hosts = await (await IpAddressModel.find({ netTypeName }).toArray()).map((ip) => ip.ipAddress)

  return await pingHostRange(hosts)
}
