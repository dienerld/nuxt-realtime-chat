declare global {
  interface Window {
    socket: SocketIOClient.Socket
  }

  interface globalThis {
    socket: SocketIOClient.Socket
  }
}
