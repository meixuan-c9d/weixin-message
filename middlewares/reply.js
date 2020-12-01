const debug = require('~/configs/debug')
const wrap = require('~/utils/wrap')
const replySubscribe = require('~/libs/replies/subscribe')
const replyText = require('~/libs/replies/text')
module.exports = wrap(async(request, response, next) => {
  debug.log(`
    replying...
  `)
  switch(request.xmlBody.Event[0]) {
    case 'subscribe':
      replySubscribe(request, response)
      break
    case 'text':
      debug.log(`
        ${request.xmlBody.Content}
        ${typeof request.xmlBody.Content}
      `)
      // replyText(request, response, )
      break
    default:
      response.sendStatus(200)
  }
})