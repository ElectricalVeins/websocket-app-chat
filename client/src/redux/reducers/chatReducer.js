import ACTION_TYPES from '../actions/actionTypes.js';
import _            from "lodash";

const initialState = {
  chats: {
    myChatList: [],
    allAvailableChats: [],
    chatMessages: [],
    chatUsers: [],
  },
  notificationList: [],
  currentChat: null,
  isFetching: false,
  error: null,
};

function chatReducer( state = initialState, action ) {

  switch ( action.type ) {
    case ACTION_TYPES.CREATE_CHAT_SUCCESS:
      return {
        ...state,
        chats: {
          ...state.chats,
          myChatList: [ ...state.chats.myChatList, action.data ],
          allAvailableChats: [ ...state.chats.allAvailableChats, action.data ],
        }
      };

    case ACTION_TYPES.LOAD_CHAT_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPES.LOAD_CHAT_LIST_SUCCESS:
      return {
        ...state,
        chats: {
          ...state.chats,
          myChatList: action.values
        },
        isFetching: false
      };

    case ACTION_TYPES.LOAD_CHAT_LIST_ERROR:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };

    case ACTION_TYPES.LOAD_ALL_CHATS_SUCCESS:
      return {
        ...state,
        chats: {
          ...state.chats,
          allAvailableChats: action.data
        }

      };

    case ACTION_TYPES.LOAD_ALL_CHATS_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.JOIN_USER_TO_CHAT_SUCCESS:
      if( state.chats.myChatList.includes( action.data ) ) {
        return { ...state }
      }
      return {
        ...state,
        chats: {
          ...state.chats,
          myChatList: [ ...state.chats.myChatList, action.data ]
        }

      };

    case ACTION_TYPES.JOIN_USER_TO_CHAT_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.DELETE_CHAT_SUCCESS:
      const chatList = _.clone( state.chats.myChatList );

      chatList.splice( chatList.findIndex( chat => chat._id === action.data._id ), 1 );

      return {
        ...state,
        chats: {
          ...state.chats,
          myChatList: chatList
        }

      };

    case ACTION_TYPES.DELETE_CHAT_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.LEAVE_CHAT_SUCCESS:
      const newChatList = _.clone( state.chats.myChatList );
      newChatList.splice( newChatList.findIndex( chat => chat._id === action.data._id ), 1 );
      return {
        ...state,
        chats: {
          ...state.chats,
          myChatList: newChatList
        }
      };

    case ACTION_TYPES.LEAVE_CHAT_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.SELECT_CHAT_ACTION:
      return {
        ...state,
        currentChat: action.chatId,
      };

    case ACTION_TYPES.LOAD_CHAT_MESSAGES_SUCCESS:
      const { data: { messages, users } } = action;
     /*
     const newMessagesWithAuthors = messages.map( msg => ( {
        ...msg,
        author: users.find( usr => usr._id === msg.authorId ),
      } ) );
      */
      return {
        ...state,
        chats: {
          ...state.chats,
          chatMessages: messages,
          chatUsers: users,
        }
      };

    case ACTION_TYPES.LOAD_CHAT_MESSAGES_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.SEND_MESSAGE_SUCCESS:
      const newMessage = action.data;
      const { chats } = state;

      const newChatMessages = _.clone( chats.chatMessages );
      //Если сообщение новое - добавить в массив. Если нет- вернуть state
      const index = newChatMessages.findIndex( ( msg ) => msg._id === newMessage._id );

      if( index === -1 ) {

        newMessage.author = chats.chatUsers.find( usr =>
          usr._id === newMessage.authorId );
        newChatMessages.push( newMessage );
        return {
          ...state,
          chats: {
            ...state.chats,
            chatMessages: newChatMessages,
          }
        };
      }

      return { ...state };

    case ACTION_TYPES.SEND_MESSAGE_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.GET_USER_LOGIN_SUCCESS:
      const { data } = action;
      console.log( 'ACTION GET_USER_LOGIN_SUCCESS', data );
      return { ...state };

    case ACTION_TYPES.GET_USER_LOGIN_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.CLEAR_CHAT_REQUEST:
      return {
        ...state,
        chats: {
          ...state.chats,
          allAvailableChats: [],
          chatMessages: [],
          chatUsers: [],
        },
        currentChat: null,
      };

    case ACTION_TYPES.GET_NOTIFICATION_SUCCESS:
      console.log(state,action);
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
        notificationList: [ ...state.notificationList, newNotif ]
      };

    case ACTION_TYPES.DELETE_NOTIFICATION_ACTION:
      const { messageId } = action;

      const newNotificationList = _.clone( state.notificationList );
      newNotificationList.splice(
        newNotificationList.findIndex( notif => notif.message._id === messageId ),
        1 );

      return {
        ...state,
        notificationList: newNotificationList
      };

    default:
      return state;
  }
}

export default chatReducer;
