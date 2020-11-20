const debug = require('~/configs/debug')
const promisifyAsync = require('~/utils/promisify-async')
const replySubscribe = require('~/libs/replies/subscribe')
module.exports = promisifyAsync(async(request, response, next) => {
  debug.log(`
    replying...
  `)
  switch(request.xmlBody.Event[0]) {
    case 'subscribe':
      replySubscribe(request, response)
      break
    default:
      response.sendStatus(200)
  }
})