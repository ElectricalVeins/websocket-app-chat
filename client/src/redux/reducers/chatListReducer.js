import ACTION_TYPES from '../actions/actionTypes.js';
import _            from "lodash";

const initialState = {
  myChatList: [],
  allAvailableChats: [],
  error: null,
  isFetching: false,
};

function chatListReducer( state = initialState, action ) {

  switch ( action.type ) {
    case ACTION_TYPES.CREATE_CHAT_SUCCESS:
      console.log( 'reducer.action', action );
      return {
        ...state,
        myChatList: [ ...state.myChatList, action.data ],
        allAvailableChats: [ ...state.allAvailableChats, action.data ],
      };

    case ACTION_TYPES.LOAD_CHAT_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPES.LOAD_CHAT_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        myChatList: action.values
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
        allAvailableChats: action.data
      };

    case ACTION_TYPES.LOAD_ALL_CHATS_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.JOIN_USER_TO_CHAT_SUCCESS:
      return {
        ...state,
        myChatList: [ ...state.myChatList, action.data ]
      };

    case ACTION_TYPES.JOIN_USER_TO_CHAT_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.DELETE_CHAT_SUCCESS:
      const chatList = _.clone( state.myChatList );

      chatList.splice( chatList.findIndex( chat => chat._id === action.data._id ), 1 );

      return {
        ...state,
        myChatList: chatList
      };

    case ACTION_TYPES.DELETE_CHAT_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ACTION_TYPES.LEAVE_CHAT_SUCCESS:
      const newChatList = _.clone( state.myChatList );

      newChatList.splice( newChatList.findIndex( chat => chat._id === action.data._id ), 1 );

      return {
        ...state,
        myChatList: newChatList
      };

    case ACTION_TYPES.LEAVE_CHAT_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }

}

export default chatListReducer;