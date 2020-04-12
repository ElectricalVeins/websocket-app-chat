import React       from 'react';
import { connect } from "react-redux";
import BurgerMenu  from "../BurgerMenu";
import UserImage   from "../UserImage";
import Icon        from "@mdi/react";
import { mdiChevronDown } from '@mdi/js';

const Header = props => {

  const { className, user: { profilePicture, login } } = props;

  return (
    <header className={className}>
      <BurgerMenu>
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