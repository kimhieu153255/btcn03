const db = require("./db.m");
const castsM = require("./casts.m");
module.exports = {
  addReview: async (idM, r) => {
    const review = await db.one(
      "INSERT INTO reviews VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING*",
      [
        idM,
        r.author,
        r.authorRating,
        r.helpfulnessScore,
        r.interestingVotes,
        r.languageCode,
        r.reviewText,
        r.reviewTitle,
        r.submissionDate,
      ]
    );
    return review;
  },
  byMovieID: async (idM) => {
    return await db
      .query('SELECT * FROM reviews WHERE "idMovie"=$1', idM)
      .then((el) => {
        return el;
      });
  },
  check: async (idM, a) => {
    return await db
      .query('SELECT * FROM reviews WHERE "idMovie"=$1 and author=$2', [idM, a])
      .then((el) => {
        return el[0];
      });
  },
};
