module.exports = {
    index: function(ctx, middleware) {
        ctx.status = 201
        ctx.body = {
            genres: ['dubstep', 'trap', 'DnB']
        }
    }
}