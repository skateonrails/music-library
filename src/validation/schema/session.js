const joi = require('joi')

exports.schema = joi.object().keys({
  session: {
    email: joi.string().required(),
    password: joi.string().min(5).required(),
  },
})
