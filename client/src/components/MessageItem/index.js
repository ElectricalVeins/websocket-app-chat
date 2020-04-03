import React       from 'react';
import { connect } from "react-redux";
import classNames  from 'classnames';
import PropTypes   from 'prop-types';
import moment      from 'moment';
import UserImage   from "../UserImage";

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
      <UserImage userLogin={body} imageSrc={author.profilePicture}/>
      <div>
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
            moment(updatedAt).format('HH:mm:ss')
          }
        </div>
      </div>
    </li>
  );
};

const mapDispatchToProps = ( dispatch ) => ( {} );

MessageItem.defaultProps = {
  author: {},
};


MessageItem.propTypes = {
  author: PropTypes.object,
  authorId: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  messageId: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  messageClassName: PropTypes.string,
};

export default connect( null, mapDispatchToProps )( MessageItem );
