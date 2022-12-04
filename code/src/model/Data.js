const { json } = require("body-parser");
const fs = require("fs");
const pathCasts = "./src/db/casts.json";
const pathMovies = "./src/db/movies.json";
module.exports = {
  getCasts: () => {
    const casts = fs.readFileSync(pathCasts, { encoding: "utf-8" });
    return JSON.parse(casts);
  },
  getMovies: () => {
    const movies = fs.readFileSync(pathMovies, { encoding: "utf-8" });
    return JSON.parse(movies);
  },
};
