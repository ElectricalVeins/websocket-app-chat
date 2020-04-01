import http from "./index";

export const getUserChats = ( userId ) =>
  http.get( '/user_chats', {
    headers: {
      'Content-type': 'application/json',
      'Authorization': userId
    },

  } );

export const getChatMessages = ( { chatId } ) =>
  http.get( `/chat/${chatId}/messages`, {
    headers: {
      'Content-type': 'application/json',
    }
  } );

export const getAllAvailableChats = () => http.get( '/chats', {
  headers: {
    'Content-type': 'application/json',
  }
} );

export const joinUserToChatById = ( { chatId, userId } ) =>
  http.post( `/chat/${chatId}/participants`, null, {
    headers: {
      'Authorization': userId,
    },
  } );

export const leaveChatById = ( chatId, userId ) => http.delete( `/chat/${chatId}/participants`,
  {
    headers: {
      'Authorization': userId,
    },
  } );

export const deleteChatById = ( chatId, userId ) => http.delete( `/chat/${chatId}`,
  {
    headers: {
      'Authorization': userId,
    },
  } );

export const createChat = ( {chatName,userId} ) => http.post( '/chat', { name: chatName }, {
  headers: {
    'Authorization': userId,
  },
} )