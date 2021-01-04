const debug = require('~/configs/debug')
const xmlBuilder = require('~/libs/xml-builder')
const removeMessage = require('~/libs/remove-message.js')
module.exports = (request, response) => {

  const content = request.xmlBody.Content[0]

  if (content === '缘分' || content === '缘份') {
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
            Title: '原来家长与孩子间还有这层关系？',
            Description: '快来测测你和孩子是哪种缘定的关系。',
            PicUrl: 'http://www.c9-d.com/3li6xun/qinziceshi.thumbnail.jpg',
            Url: 'http://www.c9-d.com/3li6xun/qinziceshi'
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

  return response.end('')
}