const Koa = require('koa')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')
const cluster = require('cluster')

const config = require('./config')
const log = require('./common/logger')
const routes = require('./routes')
const db = require('./database')
const errorHandler = require('./middleware/error-handler')

const app = new Koa()
app.use(koaCompress())
app.use(koaBody(config.server.bodyParser))
app.use(koaCors(config.server.cors))
app.use(errorHandler.handleErrors)

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

  log.info('Closing database connections.')
  db.knex.destroy()

  log.info('Stopping server ...')
  app.server.close(() => {
    log.info('Server stopped.')
  })
}

app.on('error', err => log.error(err, 'Unhandled application error.'))

process.once('uncaughtException', fatal)
process.once('unhandledRejection', fatal)

function fatal(err) {
  log.fatal(err, 'Fatal error occurred. Exiting the app.')

  setTimeout(() => {
    throw err
  }, 5000).unref()
}

if (require.main === module || cluster.isWorker) {
  app.start()

  process.once('SIGINT', () => app.stop())
  process.once('SIGTERM', () => app.stop())
}

module.exports = app
