const { validateToken } = require("../../services/jwt")
const { userIdentity } = require("../../services/db")

module.exports = async ctx => {
  const { headers: { authorization } } = ctx

  const token = authorization.replace("Bearer ", "")

  let userID
  try {
    const data = await validateToken(token)
    userID = data.data
  } catch (err) {
    ctx.body = {
      ok: false,
      error: {
        message: "This user does not exist",
      },
    }
  }

  const email = await userIdentity(userID)
  ctx.body = {
    ok: true,
    data: {
      email,
    },
  }
}
