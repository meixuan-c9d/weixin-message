const debug = require('~/configs/debug')
const wrap = require('~/utils/wrap')

const replyNormalMessageText = require('~/libs/replies/normal-message/text')
const replyEventPushingSubscribe = require('~/libs/replies/event-pushing/subscribe')
const replyEventPushingCustomMenuEventClick = require('~/libs/replies/event-pushing/custom-menu-event/click')

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

  // normal message
  if (
    messageType === 'text'
  ) {
    // text
    if (messageType === 'text') {
      replyNormalMessageText(request, response)
    }
  }

  // event pushing
  if (messageType === 'event') {

    if (!request.xmlBody.Event) {
      debug.log(`
MsgType 'event' found, yet Event not found
      `)
      return response.end('')
    }

    const event = request.xmlBody.Event[0].toLowerCase()

    // event pushing
    if (
      event === 'subscrible'
    ) {
      if (event === 'subscrible') {
        replyEventPushingSubscribe(request, response)
      }
    }

    // custom-menu-event
    else if (
      event === 'click' ||
      event === 'view'
    ) {
      if (event === 'click') {
        replyEventPushingCustomMenuEventClick(request, response)
      }
      if (event === 'view') {

      }
    }

    else {
      return response.end('')
    }
  
  }

})