const Koa = require('koa')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')

const routes = require('./routes')

const app = new Koa()
app.use(koaCompress())
app.use(koaBody({ multipart: true }))
app.use(koaCors({
  origin: '*',
  exposeHeaders: [
    'Authorization',
    'Content-Language',
    'Content-Length',
    'Content-Type',
    'Date',
    'ETag',
  ],
  maxAge: 3600,
}))

app.use(routes)

app.start = () => {
  console.log('Starting server ...')
  app.listen('3000', () => {
    console.log('==> 🌎  Server listening on port 3000.')
  })
}

module.exports = app
