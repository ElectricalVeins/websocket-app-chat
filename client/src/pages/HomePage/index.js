import React, { Component, useEffect } from 'react';
import ChatList                        from "../../components/ChatList";
import MessagesList                    from "../../components/MessageList";
import AvailableChats                  from "../../components/AllChatsList";
import NotificationList                from "../../components/NotificationList";
import { connect }                     from "react-redux";
import {
  createClearChatAction,
  createGetNotificationSuccessAction,
  createLoadUserChatListAction
}                                      from "../../redux/actions";
import styles                          from './HomePage.module.scss'
import { chatSocket }                  from "../../api/ws";
import UserImage                       from "../../components/UserImage";

const HomePage = ( props ) => {

  useEffect( () => {
    props.loadChatList( props.auth.user.id );
    chatSocket.on( 'new-message', ( message, chatId ) => {
      props.getNotification( message, chatId )
    } );

  }, [] );

  const handleEscape = ( event ) => {
    if( event.keyCode === 27 ) {
      props.clearCurrentChat()
    }
  };

  return (
    <div className={styles.container}
         onKeyDown={handleEscape}
         tabIndex="0">
      <AvailableChats className={styles.itemContainer}/>
      <ChatList chatList={props.chatList}/>
      <MessagesList/>
      <NotificationList notifications={props.chat.notifications}/>
    </div>
  );
};

const mapStateToProps = ( state ) => {
  console.log( 'Current State=', state );
  return state;
};

const mapDispatchToProps = dispatch => ( {
  clearCurrentChat: () => ( dispatch( createClearChatAction() ) ),
  getNotification: ( message, chatId ) => {
    dispatch( createGetNotificationSuccessAction( message, chatId ) )
  },
  loadChatList: ( data ) => {
    dispatch( createLoadUserChatListAction( data ) )
  },
} );

export default connect( mapStateToProps, mapDispatchToProps )( HomePage );