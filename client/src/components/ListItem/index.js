import React, { useEffect }   from 'react';
import { connect }            from "react-redux";
import {
  createDeleteNotificationAction,
  createJoinUserToChatRequestAction,
  createSelectChatAction
}                             from "../../redux/actions";
import { emitJoinRoom }       from "../../api/ws/chatApi";
import { joinUserToChatById } from "../../api/http/chatController";
import classNames             from 'classnames';
import { LIST_ITEM_TYPE }     from '../../constants'

const ListItem = ( props ) => {
  const {
    currentChat,
    chatItemClassName,
    selectedChatStyles,
    userId,
    type,
    name, body, id, updatedAt
  } = props;

  useEffect( () => {
    if( type === LIST_ITEM_TYPE.NOTIFICATION && id) {
      setTimeout( () => {props.deleteNotification( id )}, 3000 )
    }
  }, [] );

  const computedStyles = classNames( chatItemClassName, {
    [ selectedChatStyles ]: currentChat === id,
  } );

  const handleClick = ( e ) => {
    if( type === LIST_ITEM_TYPE.MY_CHATS ) {
      props.chatSelector( id )
    }
    if( type === LIST_ITEM_TYPE.ALL_CHATS ) {
      props.joinUserToChat( id, userId );
      props.chatSelector( id )
    }
    if( type === LIST_ITEM_TYPE.NOTIFICATION ) {
      props.deleteNotification( id )
    }
  };



  return (
    <li className={computedStyles}
        onClick={handleClick}>
      <div>
        {
          name
        }
      </div>
      <div>
        {
          body
        }
      </div>
      <div>
        {
          updatedAt
        }
      </div>
    </li>
  );
};

const mapStateToProps = ( state ) => {
  return state.chat
};

const mapDispatchToProps = ( dispatch ) => ( {
  deleteNotification: ( id ) => {
    dispatch( createDeleteNotificationAction( id ) )
  },
  joinUserToChat: ( chatId, userId ) => {
    dispatch( createJoinUserToChatRequestAction( chatId, userId ) )
  },
  chatSelector: ( id ) => {
    dispatch( createSelectChatAction( id ) )
  }
} );

export default connect( mapStateToProps, mapDispatchToProps )( ListItem );