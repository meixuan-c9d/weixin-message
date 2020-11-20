const redisClient = require('~/configs/redis')
const { promisify } = require('util')

module.exports = messageId => {
  const key = `message:` + messageId
  const redisDel = promisify(redisClient.del).bind(redisClient)
  redisDel(key)
}