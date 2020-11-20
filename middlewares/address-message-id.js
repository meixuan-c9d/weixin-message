const debug = require('~/configs/debug')
const promisifyAsync = require('~/utils/promisify-async')
const createMessageId = require('~/libs/create-message-id')
const checkIfLocalMessageIdFound = require('~/libs/check-if-local-message-id-found')
const saveMessageId = require('~/libs/save-message-id')
module.exports = promisifyAsync(async (request, response, next) => {
  const messageId = createMessageId(request.xmlBody)
  debug.log(`
    message id ${messageId}
  `)
  const ifLocalMessageIdFound = checkIfLocalMessageIdFound(messageId)
  if (!ifLocalMessageIdFound) {
    debug.log(`message id not found`)
    // message not found
    // save the entry
    saveMessageId(messageId)
    next()
  } else {
    debug.log(`message id found`)
    // message found but yet processed
    // tell not to retry
    response.sendStatus(200)
  }
})