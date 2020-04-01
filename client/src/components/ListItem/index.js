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
    name, body, id, updatedAt
  } = props;

  const computedStyles = classNames( chatItemClassName, {
    [ selectedChatStyles ]: currentChat === id,
  } );

  const handleClick = ( e ) => {
      props.joinUserToChat( id, userId );
      props.chatSelector( id )
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
  joinUserToChat: ( chatId, userId ) => {
    dispatch( createJoinUserToChatRequestAction( chatId, userId ) )
  },
  chatSelector: ( id ) => {
    dispatch( createSelectChatAction( id ) )
  }
} );

export default connect( mapStateToProps, mapDispatchToProps )( ListItem );