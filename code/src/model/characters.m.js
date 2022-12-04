const db = require("./db.m");
module.exports = {
  addCharacter: async (idM, c) => {
    const character = await db.one(
      "INSERT INTO characters VALUES($1,$2,$3) RETURNING*",
      [idM, c.id, c.characters]
    );
    return character;
  },

  chracterHasMovies: async (idM) => {
    return await db
      .query('SELECT * FROM characters WHERE "idCast"=$1', idM)
      .then((el) => {
        return el;
      });
  },
  check: async (idM, idC) => {
    return await db
      .query('SELECT * FROM characters WHERE "idCast"=$1 and "idMovie"=$2', [
        idC,
        idM,
      ])
      .then((el) => {
        return el[0];
      });
  },
};
