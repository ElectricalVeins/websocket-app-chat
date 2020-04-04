const Chat = require( './models/Chat' );
const User = require( './models/User' );
const path = require( 'path' );
const { Server } = require( 'http' );
const express = require( 'express' );
const socketIO = require( 'socket.io' );
const cors = require( 'cors' );
const app = express();
const server = new Server( app );
const io = socketIO( server );
const router = require( './router' );
const PORT = process.env.PORT || 3030;

app.use( cors() );
app.use( express.json() );
/*
 * static files
 * */
app.use( express.static( path.join( __dirname, '../uploads' ) ) );
/*
 * http routing
 * */
app.use( '/api', router );
/*
 * error handler
 * */
app.use( ( err, req, res, next ) => {
  res.status( 500 ).send( err );
} );

/*
 * WebSocket
 * */
//const chatNameSpace = io.of( '/chat' );

io.on( 'connection', function ( socket ) {

  socket.on( 'join', function ( room ) {
    socket.join( room );
  } );

  socket.on( 'message', async ( chatId, msg, from ) => {
    try {
      const message = {
        body: msg,
        authorId: from
      };

      const user = await User.findById( from );
      const chat = await Chat.findById( chatId );
      if( user && chat ) {
        chat.messages.push( message );
        const savedChat = await chat.save();
        const messagesWithAuthor = await Chat.findById( chatId )
                                       .populate( 'messages.authorId', {
                                         chats: 0,
                                         password: 0
                                       } );

        const messages = messagesWithAuthor.messages;
        const lastMessage = messages[messages.length - 1];

        if( savedChat && lastMessage ) {
          io.in( chatId ).emit( 'message', lastMessage );
          socket.to( chatId ).emit( 'new-message', lastMessage, chatId );
        }
      }
      //emit(error to client server-events namespace?)

    } catch ( e ) {
      throw e
    }

  } );
  socket.on( 'disconnect', reason => {

  } );
} );
/*
 * start server
 * */
server.listen( PORT, () =>
  console.log( `App listening on port ${PORT}!` ),
);






