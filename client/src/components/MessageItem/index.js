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

const MessageItem = ( props ) => {
  const {
    name,
    authorId,
    body,
    id,
    updatedAt,
    messageClassName
  } = props;

  const computedStyles = classNames( messageClassName, );

  const handleClick = ( e ) => {
    console.log( e.currentTarget )
  };

  return (
    <li className={computedStyles}
        onClick={handleClick}>
      <div>
        {
          name || `User has left the chat. User id: ${authorId}`
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

const mapDispatchToProps = ( dispatch ) => ( {} );

export default connect( null, mapDispatchToProps )( MessageItem );