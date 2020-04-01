import React                            from 'react';
import { Field, Form, Formik }          from "formik";
import { connect }                      from "react-redux";
import { emitMessage }                                          from "../../../api/ws/chatApi";
import {
  createClearChatAction,
  createDeleteChatAction,
  createLeaveChatRequestAction
} from "../../../redux/actions";
import * as Yup                                                 from 'yup';

const MessageForm = ( props ) => {
  const { currentChat, userId } = props;

  const messageSchema = Yup.object().shape( {
    message: Yup.string().min( 1, 'Empty message' ).required( 'EnterMessage' )
  } );

  const handleSubmit = ( { message }, formikBag ) => {
    emitMessage( currentChat, message, userId );
    // props.sendMessage( message, currentChat,userId )
    formikBag.resetForm()
  };

  const handleLeave = () => {
    props.leaveChat( currentChat, userId )
  };

  return (
    <Formik onSubmit={handleSubmit}
            validationSchema={messageSchema}
            initialValues={{
              message: ''
            }}>
      {
        ( {} ) => (
          <Form>
            <Field name={'message'}
                   type={'text'}
                   placeholder={'Type Your Message Here:'}/>

            <button type={'submit'}>Send</button>
            <br/>
            <button onClick={handleLeave}>Leave chat</button>
          </Form>
        )
      }
    </Formik>
  );
};


const mapDispatchToProps = dispatch => ( {
  leaveChat: ( currentChat, userId ) => dispatch(
    createLeaveChatRequestAction( currentChat, userId ) )
  //sendMessage: ( message, chatId,from ) => dispatch( createSendMessageRequestAction( message, chatId,from ) ),
} );


const mapStateToProps = ( state ) => {
  return {
    userId: state.auth.user.id,
    currentChat: state.chat.currentChat
  }
};

export default connect( mapStateToProps, mapDispatchToProps )( MessageForm );