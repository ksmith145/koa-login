const send = require("koa-send")

module.exports = async ctx => {
  return send(ctx, "views/homepage.html")
}
