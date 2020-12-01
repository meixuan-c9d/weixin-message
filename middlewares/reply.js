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
      replyText(request, response, request.xmlBody.Content[0])
      break
    default:
      response.sendStatus(200)
  }
})