const dataM = require("../model/Data");
const castsM = require("../model/casts.m");

exports.data = async () => {
  let dataCasts = dataM.getCasts();
  for (let i = 0; i < dataCasts.length; i++) {
    let a = await castsM.byCastID(dataCasts[i].id);
    if (!a) {
      castsM.AddCast(dataCasts[i]);
    }
  }
  console.log("xong casts");
};
