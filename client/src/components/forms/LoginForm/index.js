import React                        from 'react';
import { connect }                  from 'react-redux';
import { createLoginRequestAction } from '../../../redux/actions';
import Input                        from '../Input';
import { Field, Formik, Form }      from 'formik';
import { loginFormSchema }          from "../../../utils/validationSchemes";

let LoginForm = props => {

  const handleSubmit = ( values ) => {
    props.login( values );
  };

  return (
    <Formik onSubmit={handleSubmit}
            validationSchema={loginFormSchema}
            initialValues={{
              login: 'electricalveins',
              password: 'Test1234',
            }}>
      {
        ( { errors, touched, ...rest } ) => (
          <Form>
            <Field name={'login'}
                   type={'text'}
                   placeholder={'login'}/>
            {
              errors.login && touched.login
              ? ( <div>{errors.login}</div> )
              : null
            }
            <br/>
            <Field name={'password'}
                   type={'password'}
                   placeholder={'password'}/>
            {
              errors.password && touched.password
              ? ( <div>{errors.password}</div> )
              : null
            }
            <br/>
            <button type={'submit'}>login</button>
          </Form>
        )
      }
    </Formik>
  );
};

const mapDispatchToProps = dispatch => ( {
  login: ( data ) => dispatch( createLoginRequestAction( data ) ),
} );

export default connect( null, mapDispatchToProps )( LoginForm );
