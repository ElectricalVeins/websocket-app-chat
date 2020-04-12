import React, { useEffect, useRef }                              from 'react';
import PropTypes                                                 from 'prop-types';
import { connect }                                               from "react-redux";
import UserImage                                                 from "../UserImage";
import styles                                                    from './UserProfile.module.scss'
import { createUserCloseMenuAction, createUserToggleMenuAction } from "../../redux/actions";
import Icon                                                      from "@mdi/react";
import { mdiChevronDown }                                        from "@mdi/js";

const UserProfile = props => {
  const {
    userClassName,
    isUserMenuOpen, user: { profilePicture, login },
    isFetching, error
  } = props

  const menuRef = useRef( null );

  useEffect( () => {
    window.addEventListener( 'click', onClickOutsideHandler );
    return () => window.removeEventListener( 'click', onClickOutsideHandler )
  }, [ isUserMenuOpen ] );

  const onClickOutsideHandler = event => {
    if( isUserMenuOpen && !menuRef.current.contains( event.target ) ) {
      props.closeMenu()
    }
  };

  const onclickHandler = () =>
    props.toggleUserMenu();

  const userMenu = () => (
    <div className={styles.container} ref={menuRef}>
      <UserImage imageSrc={profilePicture} userLogin={login}/>
      <div>{login}</div>
    </div>
  )

  return (
    <>
      <div className={userClassName} onClick={onclickHandler}>
        <UserImage imageSrc={profilePicture} userLogin={login}/>
        <p>{login}</p>
        <Icon path={mdiChevronDown}
              color={'black'}
              size={1.5}/>
      </div>
      {
        isUserMenuOpen ? userMenu()
                       : null
      }
    </>
  );
};

UserProfile.propTypes = {};

const mapStateToProps = state => ( {
  user: state.auth.user,
  isUserMenuOpen: state.appState.isUserMenuOpen
} )

const mapDispatchToProps = dispatch => ( {
  closeMenu: () => dispatch( createUserCloseMenuAction() ),
  toggleUserMenu: () => dispatch( createUserToggleMenuAction() ),
} )
export default connect( mapStateToProps, mapDispatchToProps )( UserProfile );