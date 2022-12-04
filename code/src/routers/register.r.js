const registerC = require("../controllers/register.c");
const app = require("express");
const router = app.Router();
router.post("/", registerC.register);
module.exports = router;
