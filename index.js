const { callbackify } = require('util')
const verify = require('./lib/verify')
const publish = require('./lib/publish')

module.exports = {
  verifyConditions: callbackify(verify),
  publish: callbackify(publish),
}
