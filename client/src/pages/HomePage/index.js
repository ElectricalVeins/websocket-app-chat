import React, { useEffect } from 'react';
import ChatList             from "../../components/ChatList";
import MessagesList         from "../../components/MessageList";
import AllChatsList         from "../../components/AllChatsList";
import NotificationList     from "../../components/NotificationList";
import { connect }          from "react-redux";
import {
  createClearChatAction,
  createGetNotificationSuccessAction,
  createLoadUserChatListAction,
}                           from "../../redux/actions";
import styles               from './HomePage.module.scss'
import { chatSocket }       from "../../api/ws";
import useWindowSize        from "../../utils/useWindowSize";
import Header               from "../../components/Header";

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

  return (
    <>
      <Header chatState={chatState} windowSizes={windowSizes} className={styles.header}>
        <AllChatsList className={styles.allChats}/>
      </Header>
      <div className={styles.container}
           onKeyDown={handleEscape}
           tabIndex="0">
        {
          ( windowSizes.width > 800 ) && <ChatList chatState={chatState}/>
        }
        <MessagesList/>
        <NotificationList notifications={chatState.notificationList}/>
      </div>
    </>
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
