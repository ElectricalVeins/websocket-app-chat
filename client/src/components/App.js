import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage'));

function App () {
  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <PrivateRoute to={ '/sign_up' }
                    exact path={ '/' }
                    component={ HomePage }/>
      <PublicRoute to={ '/' } path={ '/sign_up' } component={ SignUpPage }/>
      <PublicRoute to={ '/' } path={ '/login' } component={ LoginPage }/>
    </Suspense>
  );
}

export default App;
