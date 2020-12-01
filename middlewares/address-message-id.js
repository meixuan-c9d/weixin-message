const debug = require('~/configs/debug')
const wrap = require('~/utils/wrap')
const createMessageId = require('~/libs/create-message-id')
const checkIfLocalMessageIdFound = require('~/libs/check-if-local-message-id-found')
const saveMessage = require('~/libs/save-message')
module.exports = wrap(async (request, response, next) => {
  const messageId = createMessageId(request.xmlBody)
  debug.log(`
    message id ${messageId}
  `)
  const ifLocalMessageIdFound = await checkIfLocalMessageIdFound(messageId)
  if (!ifLocalMessageIdFound) {
    debug.log(`message id not found`)
    // message not found
    // save the entry
    saveMessage(messageId)
    request.messageId = messageId
    next()
  } else {
    debug.log(`message id found`)
    // message found but yet processed
    // tell weixin not to retry
    // not continuing dealing with the message
    response.end('')
  }
})