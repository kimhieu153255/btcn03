const moviesM = require("../model/movies.m");
const castsM = require("../model/casts.m");

exports.load = async (req, res, next) => {
  try {
    let page = parseInt(req.params.page);
    req.session.page = page;
    let name = req.body.name;
    if (name) {
      name = `%${name}%`;
      req.session.name = name;
    }
    console.log(page, " ", name);
    let movies = await moviesM.listOfTile(name, page);
    let casts = await castsM.listOfCasts(name, page);
    console.log(casts);
    res.render("search", { a: 0, b: 2, movies: movies, casts: casts, page: 1 });
  } catch (err) {
    next(err);
  }
};

exports.loadpage = async (req, res, next) => {
  try {
    let name = req.session.name;
    let number1 = await moviesM.numberOfTile(name);
    let number2 = await castsM.numberOfName(name);
    number = Math.ceil(number1.length + number2.length / 8);
    let page = parseInt(req.params.page);
    let a = page - 1,
      b = page + 1;
    req.session.page = page;
    console.log(a, " ", b);
    if (1 <= page && page <= number) {
      let movies = await moviesM.listOfTile(name, page);
      let casts = await castsM.listOfCasts(name, page);
      res.render("search", {
        a: a,
        b: b,
        movies: movies,
        casts: casts,
        page: page,
      });
    } else if (page > number) {
      req.session.page = number;
      res.redirect("/search/" + number);
    } else if (page < 1) {
      req.session.page = 1;
      res.redirect("/search/1");
    }
  } catch (err) {
    next(err);
  }
};
