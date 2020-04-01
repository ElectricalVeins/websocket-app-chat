import ACTION_TYPES from '../actions/actionTypes.js';
import _            from 'lodash';

const initialState = {
  chatMessages: [],
  chatUsers: [],
  notifications: [],
  currentChat: null,
  isFetching: false,
  error: null,
};

//ОПРЕДЕЛЯТЬ ПО chatId пушить или нет notifications

function chatReducer( state = initialState, action ) {
  switch ( action.type ) {

    case ACTION_TYPES.SELECT_CHAT_ACTION:
      return {
        ...state,
        currentChat: action.chatId,
      };

    case ACTION_TYPES.LOAD_CHAT_MESSAGES_SUCCESS:

      console.log( action );

      const { data: { messages, users } } = action;
      //=======================================

      const newMessagesWithAuthors = messages.map( msg => ( {
        ...msg,
        author: users.find( usr => usr._id === msg.authorId ),
      } ) );

      //  const chat = newState.chats[ chatId ];
      //  chat.messages = [ ...chat.messages, ...newMessagesWithAuthors ];

      //=======================================
      return {
        ...state,
        chatMessages: newMessagesWithAuthors,
        chatUsers: users,
      };

    case ACTION_TYPES.LOAD_CHAT_MESSAGES_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.SEND_MESSAGE_SUCCESS:
      const newMessage = action.data;

      const newChatMessages = _.clone( state.chatMessages );
      //Если сообщение новое - добавить в массив. Если нет- вернуть state
      const index = newChatMessages.findIndex( ( msg ) => msg._id === newMessage._id );

      if( index === -1 ) {

        newMessage.author = state.chatUsers.find( usr =>
          usr._id === newMessage.authorId );
        newChatMessages.push( newMessage );
        return {
          ...state,
          chatMessages: newChatMessages,
        };
      }

      return { ...state };

    case ACTION_TYPES.SEND_MESSAGE_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.GET_NOTIFICATION_SUCCESS:
      const { message, chatId } = action;
      if( chatId === state.currentChat ) {
        return { ...state }
      }

      const newNotif = {
        message,
        chatId
      };

      return {
        ...state,
        notifications: [ ...state.notifications, newNotif ]
      };
    case ACTION_TYPES.DELETE_NOTIFICATION_ACTION:
      const { messageId } = action;

      const newNotificationList = _.clone( state.notifications );
      newNotificationList.splice(
        newNotificationList.findIndex( notif => notif.message._id === messageId ),
        1 );

      return {
        ...state,
        notifications: newNotificationList
      };

    default:
      return state;
  }

}

export default chatReducer;