import { takeLatest }            from 'redux-saga/effects';
import ACTION_TYPES              from '../actions/actionTypes.js';
import { loginSaga, signUpSaga } from './authSaga.js';
import {
  loadChatMessagesSaga,
  loadUserChatListSaga,
  getUserLoginSaga,
  loadAllChatsSaga, deleteChatSaga, joinChatSaga, createChatSaga, leaveChatSaga
} from "./chatSaga";

export default function* () {
  yield takeLatest( ACTION_TYPES.LOGIN_REQUEST, loginSaga );
  yield takeLatest( ACTION_TYPES.SIGN_UP_REQUEST, signUpSaga );
  yield takeLatest( ACTION_TYPES.LOAD_CHAT_LIST_REQUEST, loadUserChatListSaga );
  yield takeLatest( ACTION_TYPES.SELECT_CHAT_ACTION, loadChatMessagesSaga );
  //yield takeLatest(ACTION_TYPES.SEND_MESSAGE_REQUEST, getMessageSaga);
  yield takeLatest( ACTION_TYPES.LOAD_ALL_CHATS_REQUEST, loadAllChatsSaga );
  yield takeLatest( ACTION_TYPES.LEAVE_CHAT_REQUEST, leaveChatSaga );
  yield takeLatest( ACTION_TYPES.DELETE_CHAT_REQUEST, deleteChatSaga );
  yield takeLatest(ACTION_TYPES.JOIN_USER_TO_CHAT_REQUEST,joinChatSaga);
  yield takeLatest(ACTION_TYPES.CREATE_CHAT_REQUEST,createChatSaga);
  yield takeEvery(ACTION_TYPES.GET_USER_LOGIN_REQUEST,getUserLoginSaga)
}