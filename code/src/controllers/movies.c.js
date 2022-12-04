const dataM = require("../model/Data");
const moviesM = require("../model/movies.m");

exports.data = async () => {
  let dataMovies = dataM.getMovies();
  for (let i = 0; i < dataMovies.length; i++) {
    let a = await moviesM.byMoviesID(dataMovies[i].id);
    if (!a) {
      moviesM.AddMovies(dataMovies[i]);
    }
  }
  console.log("xong movies");
};

exports.view = async (req, res, next) => {
  try {
    let id = req.params.id;
    let movie = await moviesM.byMoviesID(id);
    res.render("view", movie);
  } catch (err) {
    next(err);
  }
};
