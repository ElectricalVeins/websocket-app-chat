import React                   from 'react';
import { Field, Form, Formik } from "formik";
import { connect }             from "react-redux";
import { emitMessage }         from "../../../api/ws/chatApi";
import {
  createClearChatAction,
  createDeleteChatAction,
  createLeaveChatRequestAction
}                              from "../../../redux/actions";
import { messageSchema }       from "../../../utils/validationSchemes";

const MessageForm = ( props ) => {
  const { currentChat, userId, className } = props;

  const handleSubmit = ( { message }, formikBag ) => {
    emitMessage( currentChat, message, userId );
    formikBag.resetForm()
  };

  const handleDelete = () => {
    props.deleteChat( currentChat, userId );
    props.clearCurrentChat()
  };

  const handleLeave = () => {
    props.leaveChat( currentChat, userId );
    props.clearCurrentChat()
  };

  return (
    <Formik onSubmit={handleSubmit}
            validationSchema={messageSchema}
            initialValues={{
              message: ''
            }}>
      {
        (props) => (
          <Form className={className}>
            <div>
              <button onClick={handleDelete}>Delete chat</button>
              <button onClick={handleLeave}>Leave chat</button>
            </div>
            <Field name={'message'}
                   type={'text'}
                   onKeyPress={e => {
                     if( e.key === 'Enter' ) {
                       e.preventDefault();
                       props.handleSubmit()
                     }
                   }}
                   autoComplete="off"
                   placeholder={'Type Your Message Here:'}/>
            <button type={'submit'}>Send</button>
          </Form>
        )
      }
    </Formik>
  );
};


const mapDispatchToProps = dispatch => ( {
  leaveChat: ( currentChat, userId ) => ( dispatch(
    createLeaveChatRequestAction( currentChat, userId ) ) ),
  deleteChat: ( currentChat, userId ) =>
    dispatch( createDeleteChatAction( currentChat, userId ) ),
  clearCurrentChat: () => ( dispatch( createClearChatAction() ) )
} );


const mapStateToProps = ( state ) => {
  return {
    userId: state.auth.user.id,
    currentChat: state.chatState.currentChat
  }
};

export default connect( mapStateToProps, mapDispatchToProps )( MessageForm );