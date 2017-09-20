const WebSocketServer = require('websocket').server
const http = require('http')
const RandomSeed = require('random-seed')
const seed = "test"

const server = http.createServer()

server.listen(8000)

const wsServer = new WebSocketServer({ httpServer: server })

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin)

    console.log(`${connection.remoteAddress} connectioned with seed=${seed}`)

    const rand = RandomSeed.create()
    rand.seed(seed)

    let n = 0

    const intervalId = setInterval(() => {
      const id = rand(Math.round(n/10) + 1)
      let event = null
      if(rand(10) > 0) {
        const data = new Array(rand(100)+1).fill(null).map(() => rand.random())
        event = { action: "ADD", id, data }
      }
      else {
        event = { action: "DEL", id }
      }
      event["time"] = Date.now()
      connection.sendUTF(JSON.stringify(event))
      n++
    }, 5)

    connection.on('close', function() {
      console.log(`${connection.remoteAddress} disconnected`)
      clearInterval(intervalId)
    })
})
