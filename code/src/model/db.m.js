const initOption = {};
const pgp = require("pg-promise")(initOption);
const cn = require("../configs/connectStr");
const db = pgp(cn);
module.exports = db;
