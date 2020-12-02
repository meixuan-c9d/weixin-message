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
    ArticleCount: 2,
    Articles: {
      item: [
        {
          Title: 'subscribe title',
          Description: 'subscribe description',
          PicUrl: 'http://www.c9-d.com/3li6xun/tmp/test.jpg',
          Url: 'https://mp.weixin.qq.com/s/BrE21aja13SJz1KuGt8U4A'
        },
        {
          Title: '',
          Description: '',
          PicUrl: '',
          Url: ''
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