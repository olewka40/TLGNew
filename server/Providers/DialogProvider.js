const Datastore = require("nedb");

const PATH_TO_DB = __dirname + "/../../db";

class DialogProvider {
  constructor() {
    this.dialogDB = new Datastore({
      filename: `${PATH_TO_DB}/dialog.db`
    });

    this.dialogDB.loadDatabase();
  }

  async find(query) {
    return new Promise((resolve, reject) => {
      this.dialogDB.find(query, (err, data) => {
        if (err) return reject();
        resolve(data);
      });
    });
  }

  async findOne(query) {
    return new Promise((resolve, reject) => {
      this.dialogDB.findOne(query, (err, data) => {
        if (err) return reject();
        resolve(data);
      });
    });
  }

  insert(dialog) {
    this.dialogDB.insert(dialog);
  }
}

module.exports = DialogProvider;
