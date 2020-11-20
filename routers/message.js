const debug = require('../configs/debug')
const express = require('express')
const router = express.Router()

const middlewareVerification = require('../middlewares/verification')
const middlewareXMLParser = require('../middlewares/xml-parser')
const middlewareReply = require('../middlewares/reply')

router
  .route('/')
  // .get(middlewareVerification)
  
  .get(middlewareXMLParser)
  // .get(middlewareReply)

module.exports = router