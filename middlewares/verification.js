const debug = require('~/configs/debug')
const promisifyAsync = require('~/utils/promisify-async')
module.exports = promisifyAsync(async(request, response, next) => {
  debug.log(`
    request originalUrl
    %O
  `, request.originalUrl)
	
  const {
    signature,
    timestamp,
    nonce
  } = request.query

  const token = process.env.NODE_ENV === 'production'
    ? process.env.TOKEN
    : process.env.TOKEN_DEV

  const stringToHash = [
    token,
    timestamp,
    nonce
  ]
    .sort()
    .join('')

  const shasum = require('crypto').createHash('sha1')
  shasum.update(stringToHash)
  const digest = shasum.digest('hex')

  debug.log(`
    signature ${signature}
    digest    ${digest}
  `)

  if (signature === digest) {
    response.send(request.query.echostr)
    return
  }
  
})