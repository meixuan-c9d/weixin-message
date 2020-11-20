module.exports = xmlBody => {
  const {
    MsgId,
    FromUserName,
    CreateTime
  } = xmlBody
  if (MsgId) {
    return MsgId[0]    
  }
  if (FromUserName && CreateTime) {
    return FromUserName[0] + CreateTime[0]
  }
}