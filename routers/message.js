const debug = require('../configs/debug')
const express = require('express')
const router = express.Router()

const middlewareVerification = require('../middlewares/verification')
const middlewareXMLParser = require('../middlewares/xml-parser')
const middlewareReply = require('../middlewares/reply')

if (!process.env.VERIFIED) {
  router.use(middlewareVerification)
} else {
  router.use(middlewareXMLParser)
  // router.use(middlewareReply)
}

module.exports = router