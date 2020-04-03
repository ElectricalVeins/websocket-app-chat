import React        from 'react';
import PropTypes    from 'prop-types';
import BurgerMenu   from "../BurgerMenu";
import ChatList     from "../ChatList";

const Header = props => {

  const{chatState,windowSizes,className}=props;

  const tabletNav = () => {
    return (
      <>
        <div  style={{textAlign:'center'}}>My chats:</div>
        <ChatList chatState={chatState}/>
        <br/>
      </>
    )
  };

  return (
    <BurgerMenu className={className}>
      {
        ( windowSizes.width <= 800 ) && ( tabletNav() )
      }
      {
        props.children
      }
    </BurgerMenu>
  );
};

Header.propTypes = {
  
};

export default Header;