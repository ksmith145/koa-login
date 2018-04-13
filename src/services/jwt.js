const koaJwt = require("koa-jwt")
const jsonwebtoken = require("jsonwebtoken")

const secret = "SeCrEtKeY"

module.exports.koaJwt = koaJwt({
  secret,
})

module.exports.validateToken = token => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, secret, (err, res) => {
      if (err) {
        return reject(err)
      }

      return resolve(res)
    })
  })
}

module.exports.signToken = userID => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(
      {
        data: userID,
      },
      secret,
      {
        expiresIn: "1d",
      },
      (err, res) => {
        if (err) {
          return reject(err)
        }

        return resolve(res)
      },
    )
  })
}
