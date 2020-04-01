import React, { Component, useEffect }   from 'react';
import { connect }                       from 'react-redux';
import styles                            from './MessageList.module.scss'
import MessageForm                       from "../forms/MessageForm";
import { chatSocket }                    from "../../api/ws";
import { createGetMessageSuccessAction } from "../../redux/actions";
import { LIST_ITEM_TYPE }                from "../../constants";
import MessageItem                       from "../MessageItem";

const MessageList = ( props ) => {
  const {
    chatMessages,
    currentChat,
    chatUsers
  } = props;

  useEffect( () => {
    chatSocket.on( 'message', ( message ) => {
      props.getMessage( message )
    } )
  } );


  const chatIsSelected = () => {
    return chatMessages.map( ( msg ) => {
      console.log( msg )
      return ( <MessageItem key={msg._id}
                            id={msg._id}
                            authorId={msg.authorId}
                            name={msg.author.login}
                            body={msg.body}
                            updatedAt={msg.updatedAt}
                            messageClassName={styles.messageItem}/> )
    } )
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