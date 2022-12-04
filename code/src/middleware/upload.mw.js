const path = require("path");
const multer = require("multer");
const appRoot = require("app-root-path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/db");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var filetypes = /json/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },
}).array("nameFile", 2);

exports.upload = upload;
