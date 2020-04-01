import React                      from 'react';
import { connect }                from "react-redux";
import { createSelectChatAction } from "../../redux/actions";
import classNames                 from 'classnames';

const ChatItem = ( props ) => {
  const {
    currentChat,
    chatItemClassName,
    selectedChatStyles,
    name,
    id,
  } = props;

  const computedStyles = classNames( chatItemClassName, {
    [ selectedChatStyles ]: currentChat === id,
  } );

  const handleClick = ( e ) => {
    props.selectChat( id )
  };

  return (
    <li className={computedStyles}
        onClick={handleClick}>
      <div>
        {
          name
        }
      </div>
    </li>
  );
};

const mapStateToProps = ( state ) => {
  return {
    currentChat: state.chat.currentChat
  }
};

const mapDispatchToProps = ( dispatch ) => ( {
  selectChat: ( id ) => {
    dispatch( createSelectChatAction( id ) )
  }
} );

export default connect( mapStateToProps, mapDispatchToProps )( ChatItem );