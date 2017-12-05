module.exports = {
  index(ctx) {
    ctx.status = 200
    ctx.body = {
      genres: ['dubstep', 'trap', 'DnB'],
    }
  },
  create(ctx) {
    ctx.status = 201
    ctx.body = {
      genre: ctx.request.body.genre,
    }
  },
}
