const send = require("koa-send")

module.exports = async ctx => {
  await send(ctx, "/views/loginPage.html")
}
