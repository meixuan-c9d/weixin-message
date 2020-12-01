const debug = require('~/configs/debug')
const wrap = require('~/utils/wrap')
const replySubscribe = require('~/libs/replies/subscribe')
const replyText = require('~/libs/replies/text')
module.exports = wrap(async(request, response, next) => {
  debug.log(`
    replying...
  `)

  if (request.xmlBody.Event) {
    switch(request.xmlBody.Event[0]) {
      case 'subscribe':
        replySubscribe(request, response)
        break
      default:
        response.sendStatus(200)
    }
  } 

  if (request.xmlBody.MsgType) {
    switch(request.xmlBody.MsgType[0]) {
      case 'text':
        replyText(request, response, request.xmlBody.Content[0])
        break
      default:
        response.sendStatus(200)
    }
  }

  
  
})