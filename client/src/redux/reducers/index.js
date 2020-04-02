import { combineReducers } from 'redux';
import authReducer         from './authReducer.js';
import newChatReducer      from "./newChatReducer";

export default combineReducers( {
  auth: authReducer,
  chatState: newChatReducer,
} );