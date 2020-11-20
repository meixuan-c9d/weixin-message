
const promisifyAsync = require('~/utils/promisify-async')
const createMessageId = require('~/libs/create-message-id')
const checkIfLocalMessageIdFound = require('~/libs/check-if-local-message-id-found')
const saveMessageId = require('~/libs/save-message-id')
module.exports = promisifyAsync(async (request, response, next) => {
  const messageId = createMessageId(request.xmlBody)
  const ifLocalMessageIdFound = checkIfLocalMessageIdFound(messageId)
  if (!ifLocalMessageIdFound) {
    // message not found
    // save the entry
    saveMessageId(messageId)
    next()
  } else {
    // message found but yet processed
    // tell not to retry
    response.sendStatus(200)
  }
})