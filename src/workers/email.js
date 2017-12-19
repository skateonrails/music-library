const kue = require('kue')
const queue = kue.createQueue()

queue.process('email', function(job, done){
  email(job.data.userId, done);
});

function email(userId, done) {
  // email send stuff...
  done();
}
