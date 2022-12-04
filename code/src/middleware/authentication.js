exports.isAuth = (req, res, next) => {
  if (req.params.login == "logout") {
    console.log("logout");
    delete req.session.uid;
    res.redirect("/");
  } else if (req.session.uid) {
    res.redirect("/home");
  } else {
    next();
  }
};
exports.isLog = (req, res, next) => {
  if (req.params.login == "logout") {
    console.log("logout");
    delete req.session.uid;
    res.redirect("/");
  } else if (!req.session.uid) {
    res.redirect("/");
  } else {
    next();
  }
};
