import mitt from 'mitt'

import { objectWithId, objectWithoutId } from './wsSync'

const map = new Map()

const url = 'ws://localhost:9075'

const ws = new WebSocket(url)

ws.onopen = () => console.log(`ws connect success`)

ws.onclose = () => console.log(`ws connection closed`)

ws.onerror = () => console.log(`ws error`)

// ws.onmessage = (e) => {
// 	try {
// 		const { id, data } = objectWithoutId(JSON.parse(e.data))

// 		console.log(data)
// 	} catch {
// 		console.log(`required json`)
// 	}
// }

export const wsSend = (data: object) => {
	if (typeof data != 'object') {
		throw new Error('ws send required a Object')
	}

	ws.send(JSON.stringify(data))

	return new Promise((resole) => {
		ws.onmessage = (e) => {
			const data = JSON.parse(e.data) as object

			ws.onmessage = () => {}

			return resole(data)
		}
	})
}
