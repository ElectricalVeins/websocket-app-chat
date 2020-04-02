import React, { useEffect, useState } from 'react';
import styles                         from './ChatList.module.scss'
import { emitJoinRoom }               from "../../api/ws/chatApi";
import ChatItem                       from "../ChatItem";


const ChatList = ( props ) => {

  const { chatList: { myChatList, isFetching, error } } = props;

  return (
    <div className={styles.container}>
      <ul>
        {
          isFetching
          ? ( <li>LOADING...</li> )
          : myChatList.map( ( chat ) => {
            emitJoinRoom( chat._id );
            return ( <ChatItem key={chat._id}
                               id={chat._id}
                               name={chat.name}
                               selectedChatStyles={styles.selectedItemContainer}
                               chatItemClassName={styles.itemContainer}/> )
          } )
        }
      </ul>
    </div>
  );
};


export default ChatList;