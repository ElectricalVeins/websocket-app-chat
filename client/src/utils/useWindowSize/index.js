import { useEffect, useState } from "react";

export default function useWindowSize() {

  const handleResize = () => {
    setWindowSize( getSizes() )
    //dispatching sizes
  };

  function getSizes() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const [ windowSize, setWindowSize ] = useState( getSizes );

  useEffect( () => {
    window.addEventListener( 'resize', handleResize );
    return () => window.removeEventListener( 'resize', handleResize )
  }, [] );

  return windowSize
};