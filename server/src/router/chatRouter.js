const chatRouter = require( 'express' ).Router();
const { findChatById } = require( '../middleware/findChatById' );
const {
  joinToChat, createChat, getChatById, createMessage,
  deleteChat,
  getMessages, leaveChat, getChatByUserId, getAllChats
} = require( '../controllers/chat.controller.js' );

chatRouter.route( '/user_chats' )
          .get( getChatByUserId );

chatRouter.route( '/chats' )
          .get( getAllChats );

chatRouter.route( '/chat(/:chatId)?' )
          .get( getChatById )
          .post( createChat )
          .delete( deleteChat );

chatRouter.route( '/chat/:chatId/participants' )
          .post( findChatById,
            joinToChat )
          .delete( findChatById,
            leaveChat );

chatRouter.route( '/chat/:chatId/messages(/:messageId)?' )
          .get( getChatById )
          .post( findChatById,
            createMessage )



module.exports = chatRouter;