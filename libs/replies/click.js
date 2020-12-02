const debug = require('~/configs/debug')
const xmlBuilder = require('~/libs/xml-builder')
const removeMessage = require('~/libs/remove-message.js')
module.exports = (request, response) => {
  const xmlObject = request.xmlBody
  const replyObjectBase = {
    ToUserName: xmlObject.FromUserName[0],
    FromUserName: xmlObject.ToUserName[0],
    CreateTime: Date.now() / 1000 | 0,
  }

  let replyObject

  const eventKey = xmlObject.EventKey[0]
  const eventKeySplitted = eventKey.split('|*|')
  const [eventKeyType, eventKeyValue] = eventKeySplitted
  
  if (eventKeyType === 'image') {
    replyObject = Object.assign(replyObjectBase, {
      MsgType: 'image',
      MediaId: eventKeyValue
    })
  }

  if (eventKeyType === 'news') {
    let isEventKeyValueAccepted
    let articleCount, articles

    if (eventKeyValue === 'jihedian') {
      articleCount = 1
      articles = {
        item: [
          {
            Title: 'title',
            Description: 'description',
            PicUrl: 'n/a',
            Url: 'n/a'
          }
        ]
      }
      isEventKeyValueAccepted = 1
    }

    if (isEventKeyValueAccepted) {
      replyObject = Object.assign(replyObjectBase, {
        MsgType: 'news',
        ArticleCount: articleCount,
        Articles: articles
      })
    }
    
  }

  if (!replyObject) {
    return response.end('')
  } else {
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
}