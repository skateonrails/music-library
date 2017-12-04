module.exports = {
  index(ctx) {
    ctx.status = 200
    ctx.body = {
      genres: ['dubstep', 'trap', 'DnB'],
    }
  },
}
