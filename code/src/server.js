const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const port = 20474;

const app = express();
app.use(morgan("combined"));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { pass: "", user: "" },
  })
);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Template engine
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: [path.join(__dirname, "/views/partials")],
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

//Routers
const userR = require("./routers/user.r");
const registerR = require("./routers/register.r");
const homeR = require("./routers/home.r");
const importR = require("./routers/import.r");
const searchR = require("./routers/search.r");
const crawR = require("./routers/crawData.r");
const moviesR = require("./routers/movie.r");
//main
app.use("/craw", crawR);
app.use("/user", userR);
app.use("/import", importR);
app.use("/home", homeR);
app.use("/registered", registerR);
app.use("/", userR);
app.use("/search", searchR);
app.use("/movie", moviesR);

//
app.use((err, req, res, next) => {
  const statusCode = err.statusCode | 500;
  res.status(statusCode).send(err.message);
});

app.listen(port, () => {
  console.log(`http://localhost:20474 listening`);
});
