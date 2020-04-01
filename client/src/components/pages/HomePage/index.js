import React, { Component, useEffect }  from 'react';
import ChatList         from "../../ChatList";
import MessagesList     from "../../MessageList";
import AvailableChats   from "../../AvailableChatList";
import NotificationList from "../../NotificationList";
import { connect }      from "react-redux";
import {
  createGetNotificationSuccessAction,
  createLoadUserChatListAction
}                       from "../../../redux/actions";
import styles           from './HomePage.module.scss'
import { chatSocket }   from "../../../api/ws";
import UserImage        from "../../UserImage";

const HomePage = ( props ) => {

  useEffect( () => {
    props.loadChatList( props.auth.user.id );
    chatSocket.on( 'new-message', ( message, chatId ) => {
      props.getNotification(message, chatId)
    } )
  }, [] );

  return (
    <div className={styles.container}>
      <AvailableChats className={styles.itemContainer}/>
      <ChatList chatList={props.chatList}/>
      <MessagesList/>
      <NotificationList notifications={props.chat.notifications} />
    </div>
  );
};

const mapStateToProps = ( state ) => {
  // const { chatList, loadChatList, auth } = state;
  console.log( 'Current State=', state );
  return state;
};

const mapDispatchToProps = dispatch => ( {
  getNotification:(message, chatId)=>{
    dispatch( createGetNotificationSuccessAction(message, chatId))
  },
  loadChatList: ( data ) => {
    dispatch( createLoadUserChatListAction( data ) )
  },
} );

export default connect( mapStateToProps, mapDispatchToProps )( HomePage );