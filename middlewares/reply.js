const { promisify } = require('util')
const xml2js = require('xml2js')
const debug = require('../configs/debug')
const promisifyAsync = require('../utils/promisify-async')
// const redisClient = require('../configs/redis')

// const xmlBuilder = new xml2js.Builder({
// 	headless: true,
// 	rootName: 'xml',
// 	cdata: true
// })

module.exports = promisifyAsync(async(request, response, next) => {

})