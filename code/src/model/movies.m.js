const db = require("./db.m");
module.exports = {
  AddMovies: async (m) => {
    const movies = await db.one(
      "INSERT INTO movies VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING*",
      [
        m.id,
        m.img,
        m.title,
        m.year,
        m.topRank,
        m.rating,
        m.ratingCount,
        m.genres,
      ]
    );
    return movies;
  },
  top: async (n) => {
    return await db
      .query('SELECT * FROM movies ORDER BY movies."topRank" ASC limit $1', n)
      .then((el) => {
        return el;
      });
  },
  byMoviesID: async (id) => {
    return await db.query("SELECT * FROM movies WHERE id=$1", id).then((el) => {
      return el[0];
    });
  },
  listOfTile: async (name, page) => {
    return await db
      .query(
        "(select * from movies where title like $1 limit $2) except (select* from movies where title like $1 limit $3) ",
        [name, page * 4, 4 * (page - 1)]
      )
      .then((el) => {
        return el;
      });
  },
  numberOfTile: async (name) => {
    return await db
      .query("(select * from movies where title like $1 )", [name])
      .then((el) => {
        return el;
      });
  },
};
