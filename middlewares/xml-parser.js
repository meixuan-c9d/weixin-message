const { promisify } = require('util')
const debug = require('../configs/debug')
const xml2js = require('xml2js')
const xmlParseString = promisify(xml2js.parseString) 
const promisifyAsync = require('../utils/promisify-async')

module.exports = promisifyAsync(async(request, response, next) => {
  debug.log('parser hit')
  const xmlBody = (await xmlParseString(request.body)).xml
  debug.log(`
    xmlBody %O
  `, xmlBody)
  request.xmlBody = xmlBody

  // next()
})