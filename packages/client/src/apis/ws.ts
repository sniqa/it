const url = 'ws://localhost:9075'

const ws = new WebSocket(url)

ws.onopen = () => console.log(`ws connect success`)

ws.onclose = () => console.log(`ws connection closed`)

ws.onerror = () => console.log(`ws error`)

ws.onmessage = (e) => {
  try {
    JSON.parse(e.data)
  } catch {
    console.log(`required json`)
  }
}

export {}
