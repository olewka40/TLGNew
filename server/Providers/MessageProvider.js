const Datastore = require("nedb");

const PATH_TO_DB = __dirname + "/../../db";

class MessageProvider {
  constructor() {
    this.messageDB = new Datastore({
      filename: `${PATH_TO_DB}/message.db`
    });

    this.messageDB.loadDatabase();
  }

  async find(query, modifiers) {
    return new Promise((resolve, reject) => {
      this.messageDB
        .find(query)
        .sort({ time: 1 })
        .exec((err, data) => {
          modifiers && modifiers(err, data);
          if (err) return reject();

          resolve(data);
        });
    });
  }

  async findOne(query) {
    return new Promise((resolve, reject) => {
      this.messageDB.findOne(query, (err, data) => {
        if (err) return reject();

        resolve(data);
      });
    });
  }
  async update(query, data, settings) {
    return new Promise((resolve, reject) => {
      this.messageDB.update(query, data, settings, (err, data) => {
        if (err) return reject();
        resolve(data);
      });
    });
  }
  insert(message) {
    return new Promise((resolve, reject) => {
      this.messageDB.insert(message, (err, data) => {
        if (err) return reject();
        resolve(data);
      });
    });
  }
}

module.exports = MessageProvider;
