import React  from 'react';
import styles from './UserImage.module.scss'

const UserImage = ( props ) => {
  const { imageSrc, className, userLogin } = props;

  const stringToColour = function ( str ) {
    let hash = 0;
    for ( let i = 0; i < str.length; i++ ) {
      hash = str.charCodeAt( i ) + ( ( hash << 5 ) - hash );
    }
    let colour = '#';
    for ( let i = 0; i < 3; i++ ) {
      let value = ( hash >> ( i * 8 ) ) & 0xFF;
      colour += ( '00' + value.toString( 16 ) ).substr( -2 );
    }
    return colour;
  };

  const imageBackUp = () => {
    return (
      <div style={{ backgroundColor: stringToColour( userLogin ) }}
           className={styles.backUpStyles}>
        {
          Array.from( userLogin )[ 0 ]
        }
      </div>
    )
  };

  return (
    <div>
      {
        imageSrc
        ? <img className={styles.backUpStyles} src={imageSrc} alt="user image"/>
        : imageBackUp()
      }
    </div>
  );
};

export default UserImage;