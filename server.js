const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("body-parser");
const render = require("koa-swig");
const {
  checkIfUserExists,
  insertUser,
  passwordsAreEqual,
  checkUserLogin,
  hashPassword,
  getUser
} = require("./user_database");
const bcrypt = require("bcrypt");

const app = new Koa();
const router = new Router();
const path = __dirname + "/views/";

//app.use(route.get("/", login));

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//app.use(koa.static("public"));

router.get("/hi", (ctx, next) => {
  console.log("login screen");
  this.body = "<h1> hi <h1>"; //res.sendFile(path + "loginPage.html");
});

/*app.get("/", (req, res) => {});

app.post("/api/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userCorrect = await checkUserLogin(email, password);

    if (userCorrect) {
      console.log(userCorrect);
      const user = await getUser(email);
      req.session.user = user;
      return res.redirect("/homepage");
    }

    return res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

app.get("/signup", (req, res) => {
  res.sendFile(path + "signUpPage.html");
});

app.post("/api/signup", async (req, res, next) => {
  try {
    const email =
      typeof req.body.email === "string"
        ? req.body.email.toLowerCase().trim()
        : "";
    const password1 = req.body.password1;
    const password2 = req.body.password2;

    if (!passwordsAreEqual(password1, password2)) {
      return next();
    }

    const userExists = await checkIfUserExists(email);
    if (userExists) {
      return next();
    }

    const hash = await hashPassword(password1);
    const insert = await insertUser(email, hash);
    return res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

app.get("/homepage", (req, res) => {
  if (req.session && req.session.user) {
    res.sendFile(path + "homepage.html");
  } else {
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.status(404).send("Sorry can't find that");
});

app.post("*", (req, res) => {
  res.status(400).send("Bad request");
});*/

app.listen(5000, () => {
  console.log("App listening on port 5000");
});
