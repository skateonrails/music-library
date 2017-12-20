const kue = require('kue')

const queue = kue.createQueue()

queue.process('user_email', (job, done) => {
  // email send stuff...
  const userId = job.data.userId
  console.log(userId)
  done()
})
