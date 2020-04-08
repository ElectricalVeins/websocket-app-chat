const UserError=require('../utils/errors');

module.exports.handleUserError= (err, req, res, next)=> {
  if (err instanceof UserError) {
    return res.status( err.status ).send( err.message );
  } else {
    next( err );
  }
};