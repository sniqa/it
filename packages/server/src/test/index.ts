import { pingHost, pingHostRange } from '../controller/ping'

const hosts: Array<string> = []

for (let i = 194; i < 205; i++) {
	hosts.push(`192.168.0.${i}`)
}

console.log(await pingHostRange({ hosts }))
