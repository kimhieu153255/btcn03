const moviesM = require("../model/movies.m");

exports.load = async (req, res, next) => {
  try {
    let movies = await moviesM.top(12);
    res.render("home", { movies: movies });
  } catch (error) {
    next(error);
  }
};
