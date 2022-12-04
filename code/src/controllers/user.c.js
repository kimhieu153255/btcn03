const userM = require("../model/user.m");
const moviesM = require("../model/movies.m");
const Crypto = require("crypto-js");
const dataM = require("../model/Data.js");

const hashLength = 32;
exports.load = async (req, res, next) => {
  try {
    res.render("login", { u1: "none", u2: "block", u3: "none" });
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const un = req.body.username;
    const pw = req.body.password;
    switch (req.params.login) {
      case "signin":
        {
          if (!un)
            return res.render("login", {
              u1: "none",
              u2: "block",
              u3: "block",
            });
          let uDB = await userM.byName(un);
          if (!uDB)
            return res.render("login", {
              u1: "none",
              u2: "block",
              u3: "block",
            });
          const pwDB = uDB.password;
          const salt = pwDB.slice(hashLength);
          const pwSalt = pw + salt;
          const pwHash = Crypto.SHA3(pwSalt, {
            outputLength: hashLength * 4,
          }).toString(Crypto.enc.Hex);
          if (pwDB === pwHash + salt) {
            req.session.uid = uDB.id;
            res.redirect("/home");
          } else res.render("login", { u1: "none", u2: "block", u3: "block" });
        }
        break;
      case "register":
        {
          res.render("register");
        }
        break;
    }
  } catch (error) {
    next(error);
  }
};

exports.favoriteMovies = async (req, res, next) => {
  try {
    const uid = req.session.uid;
    let movieU = await userM.byID(uid);
    // console.log(movieU);
    let movies = [];
    for (let i = 0; i < movieU.like.length; i++) {
      const el = movieU.like[i];
      let movie = await moviesM.byMoviesID(el);
      movies.push(movie);
    }
    console.log(movies);
    res.render("favoriteMovies", { movies: movies });
  } catch (err) {
    next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    let id = req.params.id;
    const uid = req.session.uid;
    let user = await userM.byID(uid);
    let movies = [];
    for (let i = 0; i < user.like.length; i++) {
      const el = user.like[i];
      if (id != el) movies.push(el);
    }
    user.like = movies;
    await userM.deleteName(user.username);
    await userM.addUser(user);
    console.log(user);
    res.redirect("/user/Movies");
  } catch (err) {
    next(err);
  }
};

exports.addMovie = async (req, res, next) => {
  try {
    let id = req.params.id;
    const uid = req.session.uid;
    let user = await userM.byID(uid);
    console.log(!user.like.includes(id));
    if (!user.like.includes(id)) {
      user.like.push(id);
      await userM.deleteName(user.username);
      await userM.addUser(user);
    }
    console.log(user);
    res.redirect("/user/Movies");
  } catch (err) {
    next(err);
  }
};
