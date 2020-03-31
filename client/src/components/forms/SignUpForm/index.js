import React from 'react';
import { Formik, Form, Field } from 'formik';
import { createSignUpRequestAction } from '../../../redux/actions';
import { connect } from 'react-redux';

const SignUpForm = props => {

  const handleSubmit = (values) => {
    const formData = new FormData();

    Object.keys(values).forEach(key => {
      console.log(values[ key ]);
      formData.append(key, values[ key ]);
    });
    props.signUp(formData);
  };

  return (
    <Formik onSubmit={ handleSubmit } initialValues={ {
      login: '',
      password: '',
      profilePicture: '',
    } }>
      {
        ({ setFieldValue, ...rest }) => (
          <Form encType="multipart/form-data">
            <Field type="text" name="login" placeholder="Login"/>
            <br/>
            <Field type="password" name="password" placeholder="Password"/>
            <br/>
            <input name={ 'profilePicture' }
                   type="file"
                   multiple={ false }
                   onChange={ (event) => {

                     setFieldValue('profilePicture',
                       event.currentTarget.files[ 0 ]);
                   } }/>
            <br/>
            <button type={ 'submit' }>Sign Up</button>
          </Form>
        )
      }
    </Formik>
  );
};

const mapStateToProps = state => ( {} );

const mapDispatchToProps = dispatch => ( {
  signUp: (data) => dispatch(createSignUpRequestAction(data)),
} );
export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);