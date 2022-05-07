import { WebSocketServer, WebSocket, RawData } from 'ws'
import { REQUIRED_JSON, falseRes } from './error'

interface WsServerInfo {
  port: number
  callback: (ws: WebSocket, data: object) => void
}

const wsServer = (info: WsServerInfo) => {
  const { port, callback } = info

  const wss = new WebSocketServer({ port })

  wss && console.log(`ws server run at localhost:${port}`)

  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      try {
        const json = JSON.parse(data.toString())

        callback(ws, json)
      } catch {
        ws.send(JSON.stringify(falseRes(REQUIRED_JSON)))
      }
    })
  })
}

export default wsServer
