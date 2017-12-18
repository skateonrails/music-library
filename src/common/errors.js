class ServerError extends Error {
  constructor(type, message, status) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.type = type
    this.status = status
  }
}

class InternalServerError extends ServerError {
  constructor(type = 'E_INTERNAL_SERVER_ERROR', message = 'Unknown error.') {
    super(type, message, 500)
  }
}

class NotFoundError extends ServerError {
  constructor(type = 'E_NOT_FOUND', message = 'Target resource was not found.') {
    super(type, message, 404)
  }
}

class ValidationError extends ServerError {
  constructor(type = 'E_VALIDATION', message = 'Validation did not passed.') {
    super(type, message, 400)
  }
}

class UnauthorizedError extends ServerError {
  constructor(type = 'E_UNAUTHORIZED', message = 'Not authorized.') {
    super(type, message, 401)
  }
}

module.exports = {
  ServerError,
  InternalServerError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
}
