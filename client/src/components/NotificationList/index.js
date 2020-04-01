import React              from 'react';
import ListItem           from "../ListItem";
import styles             from './NotificationList.module.scss'

const NotificationList = ( props ) => {
  const { notifications } = props;
  return (
    <ul className={styles.container}>
      {
        notifications
        ? notifications.map( ( item ) => ( <ListItem key={item.message._id}
                                                     id={item.message._id}
                                                     body={item.message.body}
                                                     name={item.chatId}
                                                     notificationItemClassName={styles.itemContainer}/> ) )
        : null
      }
    </ul>
  );
};

export default NotificationList;