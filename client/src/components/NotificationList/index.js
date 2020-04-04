import React            from 'react';
import styles           from './NotificationList.module.scss'
import NotificationItem from "../NotificationItem";

const NotificationList = ( props ) => {
  const { notifications} = props;

  return (
    <ul className={styles.container}>
      {
        notifications
        ? notifications.map( ( item ) => ( <NotificationItem key={item.message._id}
                                                                id={item.message._id}
                                                                body={item.message.body}
                                                                author={item.message.authorId.login}
                                                                name={item.chatId}
                                                                notificationItemClassName={styles.itemContainer}/> ) )
        : null
      }
    </ul>
  );
};

export default NotificationList;