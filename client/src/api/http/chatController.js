import http from "./index";

export const getUserChats = () =>
  http.get( '/user_chats' );

export const getChatMessages = ( { chatId } ) =>
  http.get( `/chat/${chatId}/messages` );

export const getAllAvailableChats = () =>
  http.get( '/chats' );

export const joinUserToChatById = ( { chatId } ) =>
  http.post( `/chat/${chatId}/participants` )

export const leaveChatById = ( chatId ) =>
  http.delete( `/chat/${chatId}/participants` );

export const deleteChatById = ( chatId ) =>
  http.delete( `/chat/${chatId}` );

export const createChat = ( { chatName } ) =>
  http.post( '/chat', { name: chatName } )