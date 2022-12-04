const homeC = require("../controllers/home.c");
const midleW = require("../middleware/authentication");
const uploadDataW = require("../controllers/uploadData");
const app = require("express");
const router = app.Router();
router.get("/", midleW.isLog, homeC.load);
module.exports = router;
