const joi = require('joi')

exports.schema = joi.object().keys({
  user: {
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
  },
})
