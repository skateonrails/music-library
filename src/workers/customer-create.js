const kue = require('kue')
const fetchFirstUserService = require('./../services/user/fetch-first')
const customerCreateService = require('./../services/stripe/customer/create')

const queue = kue.createQueue()

queue.process('customer:create', (job, done) => {
  // email send stuff...
  const userId = job.data.userId
  fetchFirstUserService.process({
    id: userId,
  }).then(user => {
    customerCreateService.process({
      user,
    }).then(() => {
      done()
    })
  })
})
