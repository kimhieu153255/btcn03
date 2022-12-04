const castsC = require("../controllers/casts.c");
const charactersC = require("../controllers/chracters.c");
const moviesC = require("../controllers/movies.c");
const synopsesC = require("../controllers/synopses.c");
const reviewsC = require("../controllers/reviews.c");

exports.loadData = async (req, res, next) => {
  try {
    console.log("vào loaddata");
    await moviesC.data();
    await castsC.data();
    await charactersC.data();
    await synopsesC.data();
    await reviewsC.data();
    res.redirect("/home");
  } catch (err) {
    next(err);
  }
};
