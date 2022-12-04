const Cryto = require("crypto-js");
const hashLength = 32;
const userM = require("../model/user.m");

exports.register = async (req, res, next) => {
  try {
    const un = req.body.username;
    const pw = req.body.password;
    if (!pw || !un) {
      return res.render("register", { error: "Please fill all fields!!" });
    }
    const salt = Date.now().toString(16);
    const pwSalt = pw + salt;
    const pwHash = Cryto.SHA3(pwSalt, {
      outputLength: hashLength * 4,
    }).toString(Cryto.enc.Hex);
    const user = {
      username: un,
      password: pwHash + salt,
      like: [],
    };
    let temp = await userM.byName(user.username);
    if (!temp) {
      const uNew = await userM.addUser(user);
      return res.render("login", { u1: "none", u2: "block", u3: "none" });
    }
    res.render("register", {
      u1: "none",
      u2: "block",
      u3: "none",
      error: "Account is existed",
    });
  } catch (error) {
    next(error);
  }
};
