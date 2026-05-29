let io;

export function setSocketServer(ioInstance) {
  io = ioInstance;
}

export function getSocketServer() {
  return io;
}
