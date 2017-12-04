const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()
router.get('/', controllers.genre.index)

const routes = router.routes()
module.exports = routes
