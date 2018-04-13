const knex = require("knex")({
  dialect: "pg",
  connection: {
    host: "127.0.0.1",
    user: "ksmith",
    database: "loginDB",
  },
})
const bcrypt = require("bcrypt")

module.exports.checkIfUserExists = async function checkIfUserExists(email) {
  const users = await knex("users").where({ email })
  return users.length > 0
}

module.exports.hashPassword = function hashPassword(unhashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(unhashedPassword, 12, function(err, hash) {
      if (err) {
        return reject(err)
      }

      return resolve(hash)
    })
  })
}

module.exports.passwordsAreEqual = function passwordsAreEqual(first, second) {
  return first === second
}

module.exports.insertUser = async function insertUser(email, password) {
  return knex("users")
    .insert({
      email,
      password,
    })
    .returning(["id"])
}

module.exports.checkUserLogin = async function checkUserLogin(email, password) {
  const users = await knex("users")
    .select("password")
    .where({ email })
    .limit(1)

  if (users.length > 0) {
    const [user] = users
    return bcrypt.compare(password, user.password)
  }

  return false
}

module.exports.getUser = async function getUser(email) {
  const user = await knex("users")
    .select("id")
    .where({ email })
    .limit(1)

  if (user.length > 0) {
    const [currentUser] = user
    return currentUser.id
  }
  return 0
}

module.exports.userIdentity = async function userIdentity(id) {
  const user = await knex("users")
    .where({ id })
    .limit(1)
  if (user.length > 0) {
    const [userInfo] = user
    return userInfo.email
  } else {
    return null
  }
}
