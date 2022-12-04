const db = require("./db.m");
const castsM = require("./casts.m");
module.exports = {
  addSynopse: async (idM, s) => {
    console.log(s.hasProfanity);
    const character = await db.one(
      "INSERT INTO synopses VALUES($1,$2,$3,$4) RETURNING*",
      [idM, s.hasProfanity, s.language, s.text]
    );
    return character;
  },

  bymovieID: async (idM) => {
    return await db
      .query('SELECT * FROM synopses WHERE "idMovie"=$1', idM)
      .then((el) => {
        return el[0];
      });
  },
};
