class SocketService {
  init(socket) {
    this.socket = socket;
  }

  on(name, callback) {
    this.socket.on(name, callback);
  }
  off(name, callback) {
    this.socket.off(name, callback);
  }

  emit(name, args, callback) {
    this.socket.emit(name, args, callback);
  }
}

export default new SocketService();
