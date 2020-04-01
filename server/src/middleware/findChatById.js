const Chat = require( './../models/Chat.js' );

module.exports.findChatById = async ( req, res, next ) => {
  try {
    req.chat = await Chat.findById( req.params.chatId )
                         .populate( 'users', {
                             _id: 1,
                             login: 1,
                           } );
    if( req.chat ) {
      return next();
    }
    return res.status( 404 ).send( 'Chat Not Found' );
  } catch ( e ) {
    throw e
  }
};