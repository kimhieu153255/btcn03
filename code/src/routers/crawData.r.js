const app = require("express");
const uploadDataC = require("../controllers/uploadData");
const router = app.Router();
router.get("/", uploadDataC.loadData);
module.exports = router;
