const { promisify } = require('util')
const debug = require('~/configs/debug')
const xml2js = require('xml2js')
const xmlParseString = promisify(xml2js.parseString) 
const wrap = require('~/utils/wrap')

module.exports = wrap(async(request, response, next) => {
  const xmlBody = (await xmlParseString(request.body)).xml
  debug.log(`
    xmlBody %O
  `, xmlBody)
  request.xmlBody = xmlBody
  next()
})