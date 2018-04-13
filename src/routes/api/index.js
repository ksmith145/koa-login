const { signToken } = require("../../services/jwt")
const { checkUserLogin, getUser } = require("../../services/db")

module.exports = async ctx => {
  const email = ctx.request.body.email
  const password = ctx.request.body.password
  const userCorrect = await checkUserLogin(email, password)

  if (userCorrect) {
    const userID = await getUser(email)
    const token = await signToken(userID)

    ctx.body = {
      ok: true,
      data: {
        token,
      },
    }
  } else {
    return ctx.throw(400, "Incorrect username or password")
  }
}
