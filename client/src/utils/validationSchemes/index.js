import * as Yup                         from "yup";
import { FILE_SIZE, SUPPORTED_FORMATS } from "../../constants";


const loginSchema = Yup.string()
                       .matches( /^[a-zA-Z0-9_-]{4,15}$/,
                         '4 letters minimum,15 maximum,without special characters' )
                       .required();

const passwordSchema = Yup.string()
                          .matches( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                            'Minimum eight characters, at least one upper case English letter,' +
                            ' one lower case English letter and one number ' )
                          .required();

export const signUpFormSchema = Yup.object().shape( {
  login: loginSchema,
  password: passwordSchema,
  profilePicture: Yup.mixed()
                     .test( "fileSize", "File too large",
                       value => {
                         if( value ) {
                           return value && value.size <= FILE_SIZE
                         }
                         return true
                       } )
                     .test( "fileFormat", "Unsupported Format",
                       value => {
                         if( value ) {
                           value && SUPPORTED_FORMATS.includes( value.type )
                         }
                         return true
                       } )
} );

export const loginFormSchema = Yup.object().shape( {
  login: loginSchema,
  password: passwordSchema,
} );

export const messageSchema = Yup.object().shape( {
  message: Yup.string().min( 1, 'Empty message' ).required( 'EnterMessage' )
} );

export const chatNameSchema = Yup.object().shape( {
  name: Yup.string().min( 4, 'Chat name must contain at least 4 symbols' )
} );
