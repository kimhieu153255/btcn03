const importC = require("../controllers/import.c");
const app = require("express");
const uploadW = require("../middleware/upload.mw");
const uploadDataW = require("../controllers/uploadData");

const router = app.Router();
router.post("/", importC.loadData);
router.get("/", importC.load);
module.exports = router;
