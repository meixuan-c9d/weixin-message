const debug = require('~/configs/debug')
const wrap = require('~/utils/wrap')
const replySubscribe = require('~/libs/replies/subscribe')
const replyText = require('~/libs/replies/text')
const replyClick = require('~/libs/replies/click')
module.exports = wrap(async(request, response, next) => {
  debug.log(`
    replying...
  `)

  if (!request.xmlBody.MsgType) {
    debug.log(`
'MsgType' not found
    `)
    return response.end('')
  }

  const messageType =request.xmlBody.MsgType[0].toLowerCase()

  // text
  if (messageType === 'text') {
    replyText(request, response)
  }

  // event
  if (messageType === 'event') {

    if (!request.xmlBody.Event) {
      debug.log(`
MsgType 'event' found, yet Event not found
      `)
      return response.end('')
    }

    const event = request.xmlBody.Event[0].toLowerCase()

    switch(event) {
      // event :: subscribe
      case 'subscribe':
        replySubscribe(request, response)
        break
      // event :: click
      case 'click':
        replyClick(request, response)
        break
      // event :: view
      case 'view':
        replyView(request, response)
        break
      default:
        return response.end('')
    }
  }



})