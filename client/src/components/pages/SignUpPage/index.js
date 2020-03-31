import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../../forms/SignUpForm';
import styles from './SignUpPage.module.scss'

const SignUpPage = (props) => {

  return (
    <div className={styles.container}>
      <Link to={ '/login' }>Login</Link>
      <SignUpForm/>
    </div>
  );
};

export default SignUpPage;
