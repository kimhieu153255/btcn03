const db = require("./db.m");

module.exports = {
  getUsers: async () => {
    return db.query("SELECT * from users").then((el) => {
      return el;
    });
  },
  addUser: async (u) => {
    let id = 0;
    id = await db
      .query("SELECT id from users as u WHERE u.id>=ALL(SELECT id FROM users)")
      .then((el) => {
        return el[0];
      });
    if (!id) id = 0;
    else id = id.id + 1;
    const user = await db.one(
      "INSERT INTO users VALUES($1,$2,$3,$4) RETURNING*",
      [id, u.username, u.password, u.like]
    );
    return user;
  },
  byName: async (username) => {
    return db
      .query("SELECT * FROM users WHERE username=$1", username)
      .then((el) => {
        return el[0];
      });
  },
  byID: async (id) => {
    return db.query("SELECT * FROM users WHERE id=$1", id).then((el) => {
      return el[0];
    });
  },
  deleteName: async (username) => {
    await db.any("DELETE FROM users WHERE username=$1", [username]);
  },
};
