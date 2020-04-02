import React                               from 'react';
import { Field, Form, Formik }             from "formik";
import { connect }                         from "react-redux";
import { createChatCreationRequestAction } from "../../../redux/actions";
import { chatNameSchema }                  from "../../../utils/validationSchemes";

const MessageForm = ( props ) => {
  const { userId } = props;

  const handleSubmit = ( { name }, formikBag ) => {
    props.createChat( name, userId );
    formikBag.resetForm()
  };

  return (
    <Formik onSubmit={handleSubmit}
            validationSchema={chatNameSchema}
            initialValues={{
              name: ''
            }}>
      {
        ( { errors, touched } ) => (
          <Form>
            <Field name={'name'}
                   type={'text'}
                   placeholder={'Type Chat Name Here:'}/>
            {
              errors.name && touched.name
              ? ( <div>{errors.name}</div> )
              : null
            }
            <br/>
            <button type={'submit'}>Send</button>
          </Form>
        )
      }
    </Formik>
  );
};


const mapDispatchToProps = dispatch => ( {
  createChat: ( name, userId ) => dispatch( createChatCreationRequestAction( name, userId ) )
} );


const mapStateToProps = ( state ) => {
  return {
    userId: state.auth.user.id,
  }
};

export default connect( mapStateToProps, mapDispatchToProps )( MessageForm );