const xml2js = require('xml2js')

const xmlBuilder = new xml2js.Builder({
	headless: true,
	rootName: 'xml',
	cdata: true
})

module.exports = xmlBuilder