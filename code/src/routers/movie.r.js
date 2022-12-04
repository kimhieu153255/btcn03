const app = require("express");
const moviesC = require("../controllers/movies.c");
const router = app.Router();
router.get("/:id", moviesC.view);
module.exports = router;
