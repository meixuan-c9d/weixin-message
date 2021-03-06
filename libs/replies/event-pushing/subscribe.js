const debug = require('~/configs/debug')
const xmlBuilder = require('~/libs/xml-builder')
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
          Title: 'title',
          Description: 'description',
          PicUrl: 'n/a',
          Url: 'n/a'
        }
      ]
    }
  }
  const xml = xmlBuilder.buildObject(replyObject)
  debug.log(`
    replied XML
    ${xml}
  `)
  
  removeMessage(request.messageId)
  response.type('text/xml')
  response.send(xml)
  return
}