const Koa = require('koa')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')

const config = require('./config')
const cluster = require('./cluster')
const log = require('./common/logger')
const routes = require('./routes')

const app = new Koa()
app.use(koaCompress())
app.use(koaBody(config.server.bodyParser))
app.use(koaCors(config.server.cors))

app.use(routes)

app.start = () => {
  log.info('Starting server ...')
  app.server = app.listen(config.server.port, () => {
    log.info(`==> 🌎  Server listening on port ${config.server.port}.`)
  })
}

app.stop = () => {
  if (!app.server) {
    log.warn('Server not initialized yet.')
    return
  }

  log.info('Stopping server ...')
  app.server.close(() => {
    log.info('Server stopped.')
  })
}

app.on('error', err => log.error(err, 'Unhandled application error.'))

if (require.main === module || !cluster.isMaster) {
  app.start()

  process.once('SIGINT', () => app.stop())
  process.once('SIGTERM', () => app.stop())
}

module.exports = app
