const socketIO = require( 'socket.io' );
const Chat = require( '../models/Chat' );
const User = require( '../models/User' );
const server = require( './configureHTTPServer' );

module.exports = io = socketIO.listen( server ).on( 'connection', function ( socket ) {

  socket.on( 'join', ( room ) => {
    socket.join( room );
  } );

  socket.on( 'message', async ( chatId, msg, from ) => {
    try {
      const message = {
        body: msg,
        authorId: from
      };

      const chat = await Chat.findById( chatId );
      chat.messages.push( message );
      const savedChat = await chat.save();
      const messagesWithAuthor = await Chat.findById( chatId )
                                           .populate( 'messages.authorId', {
                                             chats: 0,
                                             password: 0
                                           } );

      //const lastMessage = messagesWithAuthor.messages[ messagesWithAuthor.messages.length - 1 ];
      const lastMessage = messagesWithAuthor.messages.last();

      if( savedChat && lastMessage ) {
        io.in( chatId ).emit( 'message', lastMessage, chatId );
        socket.to( chatId ).emit( 'new-message', lastMessage, chatId );
      }

      //emit(error to client server-events namespace?)
    } catch ( e ) {
      throw e
    }

  } );

  socket.on( 'leave-room', ( room ) => {
    socket.leave( room );
  } );

  socket.on( 'disconnect', reason => {
    socket.emit( 'disconnect', reason )
  } );


} );