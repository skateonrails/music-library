const joi = require('joi')

exports.schema = joi.object().keys({
  genre: {
    name: joi.string().required(),
  },
})
