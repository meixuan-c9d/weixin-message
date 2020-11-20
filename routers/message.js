const express = require('express')
const router = express.Router()

const middlewareVerification = require('~/middlewares/verification')
const middlewareXMLParser = require('~/middlewares/xml-parser')
const middlewareAddressMessageId = require('~/middlewares/address-message-id')
const middlewareReply = require('~/middlewares/reply')

if (!process.env.VERIFIED) {
  router.use(middlewareVerification)
} else {
  router
    .use(express.text({ type: 'text/xml' }))
    .use(middlewareXMLParser)
    .use(middlewareAddressMessageId)
    .use(middlewareReply)
}

module.exports = router