export default class Counter {
  constructor() {
    this.display = document.getElementById("counter")
    this.total = 0
    this.latency = 0
    this.fps = 0
    this.eps = 0
  }

  start(fn) {
    const socket = new WebSocket("ws://127.0.0.1:8000/")
    socket.onmessage = (event) => {
      this.total++
      const data = JSON.parse(event.data)
      this.latency = Date.now() - data["time"]
      fn(data)
    }
  }

  load_display() {
    let last_time = Date.now()
    self = this
    requestAnimationFrame(function measure() {
      const new_time = Date.now()
      self.fps = Math.round(1000 / (new_time - last_time))
      self.print()
      last_time = new_time
      requestAnimationFrame(measure)
    })
  }

  print() {
    this.display = document.getElementById("counter")
    this.display.innerHTML = `
      time: ${Math.round(performance.now())} <br>
      total: ${this.total}<br>
      latency: ${this.latency}<br>
      fps: ${this.fps}<br>
    `
  }
}
