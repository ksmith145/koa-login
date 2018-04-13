const Router = require("koa-router")
const indexRoute = require("./routes/index")
const signupRoute = require("./routes/signup")
const apiIndexRoute = require("./routes/api/index")
const apiSignupRoute = require("./routes/api/signup")
const homepageRoute = require("./routes/api/homepage")
const apiDataRoute = require("./routes/api/data")

const router = new Router()

router.get("/", indexRoute)
router.post("/", apiIndexRoute)
router.get("/signup", signupRoute)
router.post("/signup", apiSignupRoute)
router.get("/homepage", homepageRoute)
router.get("/data", apiDataRoute)

module.exports = router
