require('./configs/environment')()
const debug = require('./configs/debug')
const express = require('express')
const app = express()

const routerMessage = require('./routers/message')
// app.use(express.text({ type: 'text/xml' }))

app.use('/message', routerMessage)


app.listen(process.env.LISTEN_PORT, () => {
	debug.log(`message listening on port ${process.env.LISTEN_PORT}`)
})