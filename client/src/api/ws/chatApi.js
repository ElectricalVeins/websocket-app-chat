import { chatSocket }                         from './index.js';
import store                                  from '../../redux/store'
import * as actionCreators                    from '../../redux/actions'
import { createGetNotificationSuccessAction } from "../../redux/actions";

export const emitMessage = ( { currentChat, message, userId } ) => {
  console.log('Web S')
  console.log(currentChat, message, userId)
  chatSocket.emit( 'message', currentChat, message, userId );
}

export const emitJoinRoom = chatId =>
  chatSocket.emit( 'join', chatId );

export const emitLeaveRoom = roomId =>
  chatSocket.emit( 'leave-room', roomId )

chatSocket.on( 'message', ( message, chatId ) =>
  store.dispatch( actionCreators.createGetMessageSuccessAction( {
    ...message,
    chatId
  } ) ) );

chatSocket.on( 'new-message', ( message, chatId ) =>
  store.dispatch( actionCreators.createGetNotificationSuccessAction( message, chatId ) )
);



