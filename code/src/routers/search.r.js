const searchC = require("../controllers/search.c");
const app = require("express");
const router = app.Router();
router.post("/:page", searchC.load);
router.get("/:page", searchC.loadpage);
module.exports = router;
