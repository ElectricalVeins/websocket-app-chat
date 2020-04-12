import React       from 'react';
import BurgerMenu  from "../BurgerMenu";
import UserProfile from "../UserProfile";

const Header = props => {
  const { className, userClassName } = props;

  return (
    <header className={className}>
      <BurgerMenu>
        {
          props.children
        }
      </BurgerMenu>
      <UserProfile userClassName={userClassName}/>
    </header>
  );
};

export default Header;