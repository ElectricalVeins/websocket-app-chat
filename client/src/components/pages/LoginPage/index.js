import React     from 'react';
import LoginForm from '../../forms/LoginForm';
import { Link }  from "react-router-dom";
import styles from './LoginPage.module.scss'

const LoginPage = ( props ) => {

  return (
    <div className={styles.container}>
      <Link to={'/sign_up'}>Sign Up</Link>
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
