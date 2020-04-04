class UserError extends Error{
  constructor (msg, status) {
    super(msg);
    this._status = status;
  }

  get status () {
    return this._status;
  }

}

class BadRequestError extends UserError{
  constructor (msg) {
    super(msg || 'Bad request', 400);
  }
}

class NotFoundError extends UserError{
  constructor (msg) {
    super(msg || 'Resource not found', 404);
  }
}

class AuthorizationError extends UserError{
  constructor(msg) {
    super(msg||'Authorization Error',401);
  }
}

class AuthenticationTimeoutError extends UserError {
  constructor( message ) {
    super( message || 'Access token is missing or expired', 419 );
  }
}

module.exports = {
  UserError,
  BadRequestError,
  NotFoundError,
  AuthorizationError,
  AuthenticationTimeoutError
};
