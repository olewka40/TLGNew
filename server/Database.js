const UserProvider = require("./Providers/UserProvider");
const DialogProvider = require("./Providers/DialogProvider");
const MessageProvider = require("./Providers/MessageProvider");

class Database {
  constructor() {
    this.user_provider = new UserProvider();
    this.dialog_provider = new DialogProvider();
    this.message_provider = new MessageProvider();
  }
}

module.exports = new Database();
