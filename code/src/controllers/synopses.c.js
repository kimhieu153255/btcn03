const dataM = require("../model/Data");
const synopsesM = require("../model/synopses.m");

exports.data = async () => {
  let dataMovies = dataM.getMovies();
  for (let i = 0; i < dataMovies.length; i++) {
    let el = dataMovies[i].synopses;
    let a = await synopsesM.bymovieID(dataMovies[i].id);
    if (!a && el) await synopsesM.addSynopse(dataMovies[i].id, el);
  }
  console.log("xong synopses");
};
