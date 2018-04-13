const {
  checkIfUserExists,
  hashPassword,
  insertUser,
} = require("../../services/db")
const { signToken } = require("../../services/jwt")

module.exports = async ctx => {
  const email =
    typeof ctx.request.body.email === "string"
      ? ctx.request.body.email.toLowerCase().trim()
      : ""
  const password = ctx.request.body.password

  const userExists = await checkIfUserExists(email)
  if (userExists) {
    return ctx.throw(400, "user already exists", {
      props: {
        email: "user already exists",
      },
    })
  }

  const hash = await hashPassword(password)
  const [user] = await insertUser(email, hash)

  const token = await signToken(user.id)

  ctx.body = {
    ok: true,
    data: {
      token,
    },
  }
}
