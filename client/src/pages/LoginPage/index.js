import React     from 'react';
import LoginForm from '../../components/forms/LoginForm';
import { Link }  from "react-router-dom";
import styles    from '../SignUpPage/SignUpPage.module.scss'

const LoginPage = ( props ) => {

  return (
    <div className={styles.container}>
      <Link to={'/sign_up'}>Sign Up</Link>
      <LoginForm className={styles.formStyles}/>
    </div>
  );
};

export default LoginPage;
