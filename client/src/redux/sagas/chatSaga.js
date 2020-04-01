import { put } from 'redux-saga/effects';
import {
  createLoadChatMessagesErrorAction,
  createLoadChatMessagesSuccessAction,
  createLoadUserChatListErrorAction,
  createLoadUserChatListSuccessAction,
  createLoadAllChatSuccess,
  createLoadAllChatError,
  createLeaveChatSuccessAction,
  createLeaveChatErrorAction,
  createJoinUserToChatErrorAction,
  createJoinUserToChatSuccessAction,
  createChatCreationSuccessAction,
  createChatCreationErrorAction,
  createDeleteChatSuccess,
  createDeleteChatError, createGetUserActionSuccess, createGetUserActionError
} from '../actions';
import {
  createChat, deleteChatById,
  getAllAvailableChats,
  getChatMessages,
  getUserChats, joinUserToChatById, leaveChatById
}                      from "../../api/http/chatController";
import { getUserById } from "../../api/http/userController";

export function* loadUserChatListSaga( { values } ) {
  try {
    const { data } = yield getUserChats( values );
    yield put( createLoadUserChatListSuccessAction( data ) );
  } catch ( e ) {
    yield put( createLoadUserChatListErrorAction( e.response ) );
  }
}

export function* loadChatMessagesSaga( chatId ) {
  try {
    const { data } = yield getChatMessages( chatId );
    yield put( createLoadChatMessagesSuccessAction( data ) )
  } catch ( e ) {
    yield put( createLoadChatMessagesErrorAction( e ) )
  }
}

export function* loadAllChatsSaga() {
  try {
    const { data } = yield getAllAvailableChats();
    yield put( createLoadAllChatSuccess( data ) )
  } catch ( e ) {
    yield put( createLoadAllChatError( e ) )
  }
}


export function* deleteChatSaga( { currentChat, userId } ) {
  try {
    const { data } = yield deleteChatById( currentChat, userId );
    yield put( createDeleteChatSuccess( data ) )
  } catch ( e ) {
    yield put( createDeleteChatError( e ) )
  }
}

export function* leaveChatSaga( { currentChat, userId } ) {
  try {
    const { data } = yield leaveChatById( currentChat, userId );
    yield put( createLeaveChatSuccessAction( data ) )
  } catch ( e ) {
    yield put( createLeaveChatErrorAction( e ) )
  }
}


export function* joinChatSaga( chatId, userId ) {
  try {
    const { data } = yield joinUserToChatById( chatId, userId );
    yield put( createJoinUserToChatSuccessAction( data ) )
  } catch ( e ) {
    yield put( createJoinUserToChatErrorAction( e ) )
  }
}

export function* createChatSaga( chatName, userId ) {
  try {
    const { data } = yield createChat( chatName, userId );
    yield put( createChatCreationSuccessAction( data ) )
  } catch ( e ) {
    yield put( createChatCreationErrorAction( e ) )
  }
}
export function* getUserLoginSaga( {userId} ) {
  try {
    const { data } = yield getUserById( userId );
    yield put( createGetUserActionSuccess( data ) )
  } catch ( e ) {
    yield put( createGetUserActionError( e ) )
  }
}

/*

 export function* getMessageSaga(data) {
 try {
 yield put( createGetMessageSuccessAction( data ) )
 } catch ( e ) {
 yield put( createGetMessageErrorAction( e ) )
 }
 }

 */