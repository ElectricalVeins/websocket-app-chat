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

const NotificationItem = ( props ) => {
  const {
    notificationItemClassName,
    name,
    body,
    id,
  } = props;

  useEffect( () => {
    setTimeout( () => {props.deleteNotification( id )}, 5000 )
  }, [] );

  const computedStyles = classNames( notificationItemClassName );

  const handleClick = ( e ) => {
    props.deleteNotification( id )
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
} );

export default connect( mapStateToProps, mapDispatchToProps )( NotificationItem );