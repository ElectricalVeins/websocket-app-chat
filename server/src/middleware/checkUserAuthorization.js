const { AuthorizationError, AuthenticationTimeoutError } = require( '../utils/errors' );

module.exports.checkUserAuthorization = async ( req, res, next ) => {
  try {
    if( req.headers.authorization ) {

      return next();
    }
    next( new AuthorizationError() );
  } catch ( e ) {
    next( new AuthenticationTimeoutError() );
  }
};