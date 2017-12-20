const Router = require('koa-router')
const controllers = require('../controllers')
const authorizationMiddleware = require('./../middleware/authorization')

const router = new Router()

// Sessions
router.post('/sessions', controllers.session.create)

// User routes
router.post('/user', controllers.user.create)

router.use(authorizationMiddleware.authorized)

// Routes that need authorization header
// Genre routes
router.get('/', controllers.genre.index)
router.post('/genre', controllers.genre.create)
router.patch('/genre/:id', controllers.genre.update)

const routes = router.routes()
module.exports = routes
