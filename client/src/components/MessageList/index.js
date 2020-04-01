import React, { Component, useEffect }                             from 'react';
import { connect }                                                 from 'react-redux';
import ListItem                                                    from "../ListItem";
import styles                                                      from './MessageList.module.scss'
import MessageForm                                                 from "../forms/MessageForm";
import { chatSocket }                                              from "../../api/ws";
import { createGetMessageSuccessAction, createLoginRequestAction } from "../../redux/actions";
import {LIST_ITEM_TYPE} from "../../constants";

const MessageList = ( props ) => {

  useEffect( () => {
    chatSocket.on( 'message', ( message ) => {
      props.getMessage( message )
    } )
  } );


  const chatIsSelected = () => {
    return chatMessages.map( ( msg ) => ( <ListItem key={msg._id}
                                                    name={msg.userLogin}
                                                    id={msg._id}
                                                    body={msg.body}
                                                    type={LIST_ITEM_TYPE.MESSAGE_LIST}
                                                    updatedAt={msg.updatedAt}
                                                    chatItemClassName={styles.messageItem}/> ) )
  };

  const selectChat = () => {
    return <li>Select chat</li>
  };

  return (
    <div className={styles.messageListContainer}>
      <div className={styles.inputWrapper}>
        {
          currentChat
          ? <MessageForm/>
          : null
        }
      </div>
      <ul className={styles.container}>
        {
          currentChat
          ? chatIsSelected()
          : selectChat()
        }
      </ul>

    </div>
  );
};


const mapDispatchToProps = dispatch => ( {
  getMessage: ( data ) => dispatch( createGetMessageSuccessAction( data ) ),
} );

const mapStateToProps = state => {
  return state.chat;
};

export default connect( mapStateToProps, mapDispatchToProps )( MessageList );