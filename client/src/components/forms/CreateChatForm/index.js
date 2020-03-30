import React                   from 'react';
import { Field, Form, Formik } from "formik";
import { connect }             from "react-redux";
import { emitMessage }         from "../../../api/ws/chatApi";
import {
  createChatCreationRequestAction,
  createLeaveChatRequestAction
}                              from "../../../redux/actions";
import * as Yup                from 'yup';

const MessageForm = ( props ) => {
  const { userId } = props;

  const messageSchema = Yup.object().shape( {
    name: Yup.string().min( 4, 'Empty name' ).required( 'EnterMessage' )
  } );

  const handleSubmit = ( { name }, formikBag ) => {
    props.createChat( name, userId );
    formikBag.resetForm()
  };

  return (
    <Formik onSubmit={handleSubmit}
            validationSchema={messageSchema}
            initialValues={{
              name: ''
            }}>
      {
        ( {} ) => (
          <Form>
            <Field name={'name'}
                   type={'text'}
                   placeholder={'Type Chat Name Here:'}/>

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