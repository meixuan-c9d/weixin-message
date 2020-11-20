const express = require('express')
const router = express.Router()

const middlewareVerification = require('../middlewares/verification')
const middlewareXMLParser = require('../middlewares/xml-parser')
const middlewareXMLParser = require('../middlewares/reply')

router
  .route('/')
  // .get(middlewareVerification)
  .get(express.text({ type: 'text/xml' }))
  .get(middlewareXMLParser)
  // .get(middlewareReply)