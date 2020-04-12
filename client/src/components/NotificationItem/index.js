import React, { useEffect }               from 'react';
import { connect }                        from "react-redux";
import { createDeleteNotificationAction } from "../../redux/actions";
import classNames                         from 'classnames';

const NotificationItem = ( props ) => {
  const {
    notificationItemClassName,
    name,
    body,
    author,
    id,
  } = props;

  useEffect( () => {
    setTimeout( () => {props.deleteNotification( id )}, 15000 )
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
          `ChatId: ${name}`
        }
      </div>
      <div>
        {
          `Author: ${author}`
        }
      </div>
      <div>
        {
          `Sent you: ${body}`
        }
      </div>
    </li>
  );
};

const mapDispatchToProps = ( dispatch ) => ( {
  deleteNotification: ( id ) => {
    dispatch( createDeleteNotificationAction( id ) )
  },
} );

export default connect( null, mapDispatchToProps )( NotificationItem );