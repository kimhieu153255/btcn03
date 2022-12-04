const dataM = require("../model/Data");
const casts = require("../model/casts.m");
const charatersM = require("../model/characters.m");

exports.data = async () => {
  let dataMovies = dataM.getMovies();

  for (let i = 0; i < dataMovies.length; i++) {
    let el = dataMovies[i].casts;
    for (let j = 0; j < el.length; j++) {
      let temp = await casts.byCastID(el[j].id);
      if (!temp) await casts.AddCast(el[j]);
      temp = await charatersM.check(dataMovies[i].id, el[j].id);
      if (!temp) await charatersM.addCharacter(dataMovies[i].id, el[j]);
    }
  }
  console.log("xong characters");
};
