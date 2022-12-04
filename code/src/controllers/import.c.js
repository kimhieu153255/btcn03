const dataM = require("../model/Data");
const uploadDataW = require("./uploadData");
const uploadW = require("../middleware/upload.mw");
exports.load = async (req, res, next) => {
  try {
    console.log("vào import");
    res.render("import");
  } catch (err) {
    next(err);
  }
};

exports.loadData = async (req, res, next) => {
  uploadW.upload(req, res, async function (err) {
    if (err) {
      next(err);
    } else {
      res.redirect("/home");
    }
  });
};
