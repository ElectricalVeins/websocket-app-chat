import { chatSocket }                    from './index.js';

export const emitMessage = ( chatId, message, from ) => {
  chatSocket.emit( 'message', chatId, message, from );
};

export const emitJoinRoom = ( chatId ) => {
  chatSocket.emit( 'join', chatId );
};

