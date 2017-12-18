const _ = require('lodash')
const User = require('./../../database/models/user')
const hashString = require('./../../common/hash-string')
const Promise = require('bluebird')

module.exports = {
  process: async attributes => {
    let user

    if (attributes.id) {
      user = returnById(attributes.id)
    } else {
      user = await fetchUser(attributes)
    }

    return user
  },
}

function returnById(id) {
  return userQuery().findById(id)
}

async function fetchUser(attributes) {
  const password = removePasswordFromAttributes(attributes)
  const users = await getUsers(attributes)

  if (_.isEmpty(users)) {
    return null
  }

  let user

  if (password) {
    user = await findUserWithMatchingPassword(users, password)
  } else {
    user = _.first(users)
  }

  return user
}

// Helper functions
function removePasswordFromAttributes(attributes) {
  if (!attributes.password) {
    return null
  }

  const password = attributes.password
  delete attributes.password
  return password
}

function getUsers(attributes) {
  let query = userQuery()
  const attributesKeys = _.keys(attributes)

  attributesKeys.forEach(key => {
    query = query.andWhere(key, attributes[key])
  })

  return query
}

async function findUserWithMatchingPassword(users, password) {
  let foundUser

  await Promise.each(users, async element => {
    const result = await hashString.compare(password, element.password)
    if (result === true) {
      foundUser = element
    }
  })

  return foundUser
}

function userQuery() {
  return User.query()
}
