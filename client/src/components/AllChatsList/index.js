import React, { useState }          from 'react';
import { connect }                  from "react-redux";
import { createLoadAllChatRequest } from "../../redux/actions";
import ListItem                     from "../ListItem";
import styles                       from "../ChatList/ChatList.module.scss";
import CreateChatForm               from "../forms/CreateChatForm";

const AllChatsList = ( props ) => {

  const { chatState: { chats: { allAvailableChats } }, userId } = props;

  const handleClick = () => {
    props.loadAllChats()
  };

  const [ showCreateForm, setShowCreateForm ] = useState( false );
  const showForm = () => {
    setShowCreateForm( !showCreateForm )
  };

  return (
    <div className={props.className}>
      <div onClick={showForm}> Create chat:</div>
      {
        showCreateForm && <CreateChatForm formStyle={styles.form} />
      }
      <div onClick={handleClick}>
        View All Chats:
      </div>
      <ul>{
        allAvailableChats.map( ( item ) => ( <ListItem key={item._id}
                                                       id={item._id}
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
    chatState: state.chatState,
    userId: state.auth.user.id
  }
};

const mapDispatchToProps = ( dispatch ) => ( {
  loadAllChats: () => dispatch( createLoadAllChatRequest() )
} );

export default connect( mapStateToProps, mapDispatchToProps )( AllChatsList );