import React, { useEffect, useRef, useState } from 'react';
import PropTypes                              from 'prop-types';
import { mdiMenu }                            from '@mdi/js';
import Icon                                   from '@mdi/react'
import styles                                 from './BurgerMenu.module.scss'
import classNames                             from 'classnames';
import { connect }                            from "react-redux";
import {
  createCloseMenuAction,
  createToggleMenuAction
}                                             from "../../redux/actions";

const BurgerMenu = props => {

  const { isMenuOpen, closeMenu, toggleMenu } = props;

  const menuRef = useRef( null );
  //const [ isMenuOpen, setToggleMenu ] = useState( false );

  useEffect( () => {
    window.addEventListener( 'click', onClickOutsideHandler );
    return () => window.removeEventListener( 'click', onClickOutsideHandler )
  }, [ isMenuOpen ] );

  const toggleMenuOnClick = () => toggleMenu();

  const onClickOutsideHandler = event => {
    if( isMenuOpen && !menuRef.current.contains( event.target ) ) {
      closeMenu()
    }
  };

  const computedClassName = classNames( styles.content, {
    [ styles.showContent ]: isMenuOpen,
  } );

  return (
    <nav className={props.className} ref={menuRef}>
      <label htmlFor='burger'
             className={styles.burger}
             onClick={toggleMenuOnClick}>
        <Icon path={mdiMenu} size={1.5}/>
      </label>
      <div className={computedClassName}>
        {
          props.children
        }
      </div>
    </nav>
  );
};

BurgerMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};


const mapStateToProps = ( state ) => {
  return state.appState;
};

const mapDispatchToProps = dispatch => ( {
  toggleMenu: () => dispatch( createToggleMenuAction() ),
  closeMenu: () => dispatch( createCloseMenuAction() )
} );

export default connect( mapStateToProps, mapDispatchToProps )( BurgerMenu );
