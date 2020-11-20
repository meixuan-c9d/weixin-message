const debug = require('~/configs/debug')
const redisClient = require('~/configs/redis')
const { promisify } = require('util')

module.exports = messageId => {
  const key = `message:` + messageId
  const redisSet = promisify(redisClient.set).bind(redisClient)
  redisSet(
    key, 
    1,
    'EX',
    10
  )
}