import React       from 'react';
import PropTypes   from 'prop-types';
import { mdiMenu } from '@mdi/js';
import Icon        from '@mdi/react'
import styles      from './BurgerMenu.module.scss'

const BurgerMenu = props => {
  return (
    <nav className={props.className}>
      <label htmlFor='burger' className={styles.burger}>
        <Icon path={mdiMenu} size={1.5}/>
      </label>
      <input id='burger' type="checkbox" className={styles.burgerCheck}/>
      <div className={styles.content}>
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

