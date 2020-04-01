import React, { useState }          from 'react';
import { connect }                  from "react-redux";
import { createLoadAllChatRequest } from "../../redux/actions";
import ListItem                     from "../ListItem";
import styles                       from "../ChatList/ChatList.module.scss";
import { LIST_ITEM_TYPE }           from "../../constants";
import CreateChatForm               from "../forms/CreateChatForm";

const AllChatsList = ( props ) => {

  const { chatList:{allAvailableChats},userId } = props;

  const handleClick = () => {
    props.loadAllChats()
  };


  return (
    <div>
      <div className={props.className}> Create chat: </div>
      <CreateChatForm/>
      <div className={props.className} onClick={handleClick}>
        View All Chats:
      </div>
      <ul>{
        allAvailableChats.map( ( item ) => ( <ListItem key={item._id}
                                                       id={item._id}
                                                       type={LIST_ITEM_TYPE.ALL_CHATS}
                                                       name={item.name}
                                                       userId={userId}
                                                       selectedChatStyles={styles.selectedItemContainer}
                                                       chatItemClassName={styles.itemContainer}/> ) )
      }
      </ul>
    </div>
  );
};

const mapStateToProps = ( state ) => {
  return {
    chatList: state.chatList,
    userId:state.auth.user.id
  }
};

const mapDispatchToProps = ( dispatch ) => ( {
  loadAllChats: () => dispatch( createLoadAllChatRequest() )
} );

export default connect( mapStateToProps, mapDispatchToProps )( AllChatsList );