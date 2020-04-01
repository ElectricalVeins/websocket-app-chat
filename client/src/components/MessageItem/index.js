import React                   from 'react';
import { connect }             from "react-redux";
import classNames              from 'classnames';
import PropTypes               from 'prop-types';
import { createGetUserAction } from "../../redux/actions";

const MessageItem = ( props ) => {
  const {
    author,
    authorId,
    body,
    messageId, //for upd, del
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
          author.login
          ? author.login
          : `User has left the chat.UserId: ${authorId}`

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
