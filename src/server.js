const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const router = require("./router")
const serve = require("koa-static")

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      ok: false,
      error: {
        status: ctx.status,
        message: err.message,
        props: err.props,
      },
    }
  }
})

app.use(serve("./public"))
app.use(bodyParser())
app.use(router.routes())

app.listen(5000, () => {
  console.log("App listening on port 5000")
})
