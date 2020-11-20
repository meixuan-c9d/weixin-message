const debug = require('~/configs/debug')
const redisClient = require('~/configs/redis')
const { promisify } = require('util')

module.exports = async messageId => {
  const key = 
    `message:` +
    `${messageId}`

  const redisExists = promisify(redisClient.exists).bind(redisClient)
  const exists = await redisExists(key)

  debug.log(`
    ${key} exists or not
    ${exists}
  `)

  return !!exists

}

