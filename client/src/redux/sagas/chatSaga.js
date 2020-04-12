import { put }                        from 'redux-saga/effects';
import * as actionCreator             from '../actions';
import * as chatController            from "../../api/http/chatController";
import * as userController            from "../../api/http/userController";
import { emitLeaveRoom, emitMessage } from "../../api/ws/chatApi";

export function* loadUserChatListSaga( { values } ) {
  try {
    const { data } = yield chatController.getUserChats( values );
    yield put( actionCreator.createLoadUserChatListSuccessAction( data ) );
  } catch ( e ) {
    yield put( actionCreator.createLoadUserChatListErrorAction( e.response ) );
  }
}

export function* loadChatMessagesSaga( chatId ) {
  try {
    const { data } = yield chatController.getChatMessages( chatId );
    yield put( actionCreator.createLoadChatMessagesSuccessAction( data ) )
  } catch ( e ) {
    yield put( actionCreator.createLoadChatMessagesErrorAction( e.response ) )
  }
}

export function* loadAllChatsSaga() {
  try {
    const { data } = yield chatController.getAllAvailableChats();
    yield put( actionCreator.createLoadAllChatSuccess( data ) )
  } catch ( e ) {
    yield put( actionCreator.createLoadAllChatError( e.response ) )
  }
}

export function* sendMessageSaga( currentChat, message, userId ) {
  try {
    yield emitMessage( currentChat, message, userId )
  } catch ( e ) {
    yield put( actionCreator.createSendMessageErrorAction( e.response ) )
  }
}

export function* deleteChatSaga( { currentChat, userId } ) {
  try {
    const { data } = yield chatController.deleteChatById( currentChat, userId );
    yield put( actionCreator.createDeleteChatSuccess( data ) )
  } catch ( e ) {
    yield put( actionCreator.createDeleteChatError( e.response ) )
  }
}

export function* leaveChatSaga( { currentChat, userId } ) {
  try {
    const { data } = yield chatController.leaveChatById( currentChat, userId );
    yield emitLeaveRoom( currentChat )
    yield put( actionCreator.createLeaveChatSuccessAction( data ) )
  } catch ( e ) {
    yield put( actionCreator.createLeaveChatErrorAction( e.response ) )
  }
}


export function* joinChatSaga( chatId, userId ) {
  try {
    const { data } = yield chatController.joinUserToChatById( {
      chatId,
      userId
    } );
    yield put( actionCreator.createJoinUserToChatSuccessAction( data ) )
  } catch ( e ) {
    yield put( actionCreator.createJoinUserToChatErrorAction( e.response ) )
  }
}

export function* createChatSaga( chatName, userId ) {
  try {
    const { data } = yield chatController.createChat( {
      chatName,
      userId
    } );
    yield put( actionCreator.createChatCreationSuccessAction( data ) )
  } catch ( e ) {
    yield put( actionCreator.createChatCreationErrorAction( e.response ) )
  }
}

export function* getUserLoginSaga( { userId } ) {
  try {
    const { data } = yield userController.getUserById( userId );
    yield put( actionCreator.createGetUserActionSuccess( data ) )
  } catch ( e ) {
    yield put( actionCreator.createGetUserActionError( e.response ) )
  }
}
