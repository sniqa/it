// import ping from 'ping'

interface PingHostRange {
	hosts: Array<string>
}

import ping from 'ping'

export const pingHost = async () => {
	const hosts = ['192.168.1.1', '192.168.0.195']

	for (let host of hosts) {
		// WARNING: -i 2 argument may not work in other platform like windows
		let res = await ping.promise.probe(host, {
			timeout: 10,
			extra: ['-i', '2'],
		})
		console.log(res)
	}
}

export const pingHostRange = async (data: PingHostRange) => {
	const { hosts } = data

	const allHostInfo = await Promise.all(
		hosts.map(async (host) => {
			const res = await ping.promise.probe(host, {
				timeout: 10,
				extra: ['-i', '2'],
			})

			return { host: res.host, alive: res.alive }
		})
	)

	// console.log(allHostInfo)

	return allHostInfo.filter((host) => host.alive)

	// return res
}
