import { combineReducers } from 'redux';
import authReducer         from './authReducer.js';
import chatReducer         from './chatReducer.js';
import chatListReducer     from "./chatListReducer";
import notificationReducer from "./notificationReducer";
import newChatReducer      from "./newChatReducer";

export default combineReducers( {
  auth: authReducer,
  chatState: newChatReducer,
  notifications: notificationReducer,
  //delete:
  //chatList: chatListReducer,
  //chat: chatReducer,
} );