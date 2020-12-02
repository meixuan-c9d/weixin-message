const debug = require('~/configs/debug')
const xmlBuilder = require('~/libs/xml-builder')
const removeMessage = require('~/libs/remove-message.js')
module.exports = (request, response) => {
  return response.end('')
}