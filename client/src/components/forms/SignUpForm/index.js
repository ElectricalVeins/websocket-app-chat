import React                         from 'react';
import { Formik, Form, Field }       from 'formik';
import { createSignUpRequestAction } from '../../../redux/actions';
import { connect }                   from 'react-redux';
import { SignUpSchema }              from "../../../utils/validationSchemes";


const SignUpForm = props => {

  const handleSubmit = ( values ) => {
    const formData = new FormData();

    Object.keys( values ).forEach( key => {
      console.log( values[ key ] );
      formData.append( key, values[ key ] );
    } );
    props.signUp( formData );
  };

  return (
    <Formik onSubmit={handleSubmit}
            initialValues={{
              login: '',
              password: '',
              profilePicture: '',
            }}
            validateOnBlur={true}
            validationSchema={SignUpSchema}>
      {
        ( { errors, touched, setFieldValue, ...rest } ) => (
          <Form encType="multipart/form-data">
            <Field type="text" name="login" placeholder="Login"/>
            {
              errors.login && touched.login
              ? ( <div>{errors.login}</div> )
              : null
            }
            <br/>
            <Field type="password" name="password" placeholder="Password"/>
            {
              errors.password && touched.password
              ? ( <div>{errors.password}</div> )
              : null
            }
            <br/>
            <input name={'profilePicture'}
                   type="file"
                   multiple={false}
                   onChange={( event ) => {
                     setFieldValue( 'profilePicture',
                       event.currentTarget.files[ 0 ] );
                   }}/>
            {
              errors.profilePicture && touched.profilePicture
              ? ( <div>{errors.profilePicture}</div> )
              : null
            }
            <br/>
            <button type={'submit'}>Sign Up</button>
          </Form>
        )
      }
    </Formik>
  );
};

const mapStateToProps = state => ( {} );

const mapDispatchToProps = dispatch => ( {
  signUp: ( data ) => dispatch( createSignUpRequestAction( data ) ),
} );
export default connect( mapStateToProps, mapDispatchToProps )( SignUpForm );