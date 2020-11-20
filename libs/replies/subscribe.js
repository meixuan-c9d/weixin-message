const debug = require('./debug')
const xmlBuilder = require('./xml-builder')
const removeMessage = require('~/libs/remove-message.js')
module.exports = (request, response) => {
  const xmlObject = request.xmlBody
  const replyObject = {
    ToUserName: xmlObject.FromUserName[0],
    FromUserName: xmlObject.ToUserName[0],
    CreateTime: Date.now() / 1000 | 0,
    MsgType: 'news',
    ArticleCount: 1,
    Articles: {
      item: [
        {
          Title: 'subscribe title',
          Description: 'subscribe description',
          PicUrl: 'n/a',
          Url: 'https://www.baidu.com'
        }
      ]
    }
  }
  const xml = xmlBuilder.buildObject(replyObject)
  debug.log(`
    replied XML
    ${xml}
  `)
  setTimeout(() => {
    removeMessage(request.messageId)
    response.type('text/xml')
    response.send(xml)
  }, 2500)
  // return
}