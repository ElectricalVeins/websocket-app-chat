import { combineReducers } from 'redux';
import authReducer         from './authReducer.js';
import chatReducer         from "./chatReducer";
import appReducer          from "./appReducer";

export default combineReducers( {
  auth: authReducer,
  chatState: chatReducer,
  appState: appReducer,
} );