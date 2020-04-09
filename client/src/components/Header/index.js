import React       from 'react';
import { connect } from "react-redux";
import BurgerMenu  from "../BurgerMenu";
import ChatList    from "../ChatList";
import UserImage   from "../UserImage";
import Icon        from "@mdi/react";
import { mdiChevronDown } from '@mdi/js';

const Header = props => {

  const { chatState, windowSizes, className, user: { profilePicture, login } } = props;

  const tabletNav = () => {
    return (
      <>
        <div style={{ textAlign: 'center' }}>My chats:</div>
        <ChatList chatState={chatState}/>
        <br/>
      </>
    )
  };

  return (
    <header className={className}>
      <BurgerMenu >
        {
          ( windowSizes.width <= 800 ) && ( tabletNav() )
        }
        {
          props.children
        }
      </BurgerMenu>

      <div>
          <UserImage imageSrc={profilePicture} userLogin={login}/>
          <p>{login}</p>
        <Icon path={mdiChevronDown}
        color={'black'}
        size={1.5}/>
      </div>

    </header>
  );
};

const mapStateToProps = state => state.auth

export default connect( mapStateToProps )( Header );