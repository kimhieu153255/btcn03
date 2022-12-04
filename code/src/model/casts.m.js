const db = require("./db.m");
module.exports = {
  AddCast: async (c) => {
    const cast = await db.one(
      "INSERT INTO casts VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING*",
      [
        c.id,
        c.image,
        c.legacyNameText,
        c.name,
        c.birthDate,
        c.birthPlace,
        c.gender,
        c.heightCentimeters,
        c.nicknames,
        c.realName,
      ]
    );
    return cast;
  },

  byCastID: async (id) => {
    return await db.query("SELECT * FROM casts WHERE id=$1", id).then((el) => {
      return el[0];
    });
  },

  listOfCasts: async (name, page) => {
    return await db
      .query(
        "(select * from casts where name like $1 limit $2) except (select* from casts where name like $1 limit $3) ",
        [name, page * 4, 4 * (page - 1)]
      )
      .then((el) => {
        return el;
      });
  },
  numberOfName: async (name) => {
    return await db
      .query("(select * from casts where name like $1 )", [name])
      .then((el) => {
        return el;
      });
  },
};
