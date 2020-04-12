import React       from 'react';
import { connect } from "react-redux";
import {
  createJoinUserToChatRequestAction,
}                  from "../../redux/actions";
import classNames  from 'classnames';

const ListItem = ( props ) => {
  const {
    currentChat,
    chatItemClassName,
    selectedChatStyles,
    userId,
    name,
    id,
  } = props;

  const computedStyles = classNames( chatItemClassName, {
    [ selectedChatStyles ]: currentChat === id,
  } );

  const handleClick = ( e ) => {
    props.joinUserToChat( id, userId );
    //props.selectChat( id )
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
    currentChat: state.chatState.currentChat
  }
};

const mapDispatchToProps = ( dispatch ) => ( {
  joinUserToChat: ( chatId, userId ) => {
    dispatch( createJoinUserToChatRequestAction( chatId, userId ) )
  },
  /*  selectChat: ( id ) => {
   dispatch( createSelectChatAction( id ) )
   }*/
} );

export default connect( mapStateToProps, mapDispatchToProps )( ListItem );