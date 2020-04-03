import React, { useEffect, useRef, useState } from 'react';
import PropTypes                              from 'prop-types';
import { mdiMenu }                            from '@mdi/js';
import Icon                                   from '@mdi/react'
import styles                                 from './BurgerMenu.module.scss'
import classNames                             from 'classnames';

const BurgerMenu = props => {
  const menuRef = useRef( null );

  const [ isMenuOpen, setToggleMenu ] = useState( false );

  useEffect( () => {
    window.addEventListener( 'click', onClickOutsideHandler );
    return () => window.removeEventListener( 'click', onClickOutsideHandler )
  }, [isMenuOpen] );

  const toggleMenuOnClick = () => setToggleMenu(!isMenuOpen );

  const onClickOutsideHandler = event => {
    if( isMenuOpen && !menuRef.current.contains( event.target ) ) {
      setToggleMenu( false )
    }
  };

  const computedClassName = classNames( styles.content, {
    [ styles.showContent ]: isMenuOpen,
  } );

  return (
    <nav className={props.className}>
      <label htmlFor='burger'
             className={styles.burger}
             onClick={toggleMenuOnClick}>
        <Icon path={mdiMenu} size={1.5}/>
      </label>
      <div className={computedClassName} ref={menuRef}>
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

export default BurgerMenu;

