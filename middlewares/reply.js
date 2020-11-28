const debug = require('~/configs/debug')
const wrap = require('~/utils/wrap')
const replySubscribe = require('~/libs/replies/subscribe')
module.exports = wrap(async(request, response, next) => {
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