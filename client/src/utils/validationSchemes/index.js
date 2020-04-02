import * as Yup                         from "yup";
import { FILE_SIZE, SUPPORTED_FORMATS } from "../../constants";


export const SignUpSchema = Yup.object().shape( {
  login: Yup.string()
            .matches( /^[a-zA-Z0-9_-]{4,15}$/,
    '4 letters minimum,15 maximum,without special characters' )
            .required(),
  password: Yup.string()
               .matches( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                 'Minimum eight characters, at least one upper case English letter,' +
                 ' one lower case English letter and one number ' )
               .required(),
  profilePicture: Yup.mixed()
                     .test( "fileSize", "File too large",
                       value => value && value.size <= FILE_SIZE )
                     .test( "fileFormat", "Unsupported Format",
                       value => value && SUPPORTED_FORMATS.includes( value.type )
                     )
} );

