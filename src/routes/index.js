const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()
router.get('/', controllers.genre.index)
router.post('/genre', controllers.genre.create)

const routes = router.routes()
module.exports = routes
