import React, { Component, useEffect, useState } from 'react';
import ChatList                                  from "../../components/ChatList";
import MessagesList                              from "../../components/MessageList";
import AvailableChats                            from "../../components/AllChatsList";
import NotificationList                          from "../../components/NotificationList";
import { connect }                               from "react-redux";
import {
  createClearChatAction,
  createGetNotificationSuccessAction,
  createLoadUserChatListAction
}                                                from "../../redux/actions";
import styles                                    from './HomePage.module.scss'
import { chatSocket }                            from "../../api/ws";
import UserImage                                 from "../../components/UserImage";
import BurgerMenu                                from "../../components/BurgerMenu";
import useWindowSize                             from "../../utils/useWindowSize";

const HomePage = ( props ) => {

  const { auth, chatState } = props;

  const windowSizes = useWindowSize();

  useEffect( () => {
    props.loadChatList( auth.user.id );
    chatSocket.on( 'new-message', ( message, chatId ) => {
      props.getNotification( message, chatId )
    } );
  }, [] );

  const handleEscape = ( event ) => {
    if( event.keyCode === 27 ) {
      props.clearCurrentChat()
    }
  };

  const tabletNav = () => {
    return (
      <>
        <div>My chats:</div>
        <ChatList chatState={chatState}/>
      </>
    )
  };

  return (
    <div className={styles.container}
         onKeyDown={handleEscape}
         tabIndex="0">
      <BurgerMenu className={styles.burgerMenuContainer}>
        {
          ( windowSizes.width < 900 ) && ( tabletNav() )
        }
        <AvailableChats className={styles.allChats}/>
      </BurgerMenu>
      {
        ( windowSizes.width >= 900 ) && <ChatList chatState={chatState}/>
      }
      <MessagesList/>
      <NotificationList notifications={chatState.notificationList}/>
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