import http           from './index.js';
import { ACCESS_KEY } from "../../constants";

const authUser = async ( url, userData, config ) => {
  try {
    const response = await http.post( url, userData, config );
    const { data } = response;
    sessionStorage.setItem( ACCESS_KEY, data.id );
    return response
  } catch ( e ) {
    sessionStorage.removeItem( ACCESS_KEY );
    throw e
  }
};

export const signUpUser = async data => authUser( '/sign_up', data, {
  headers: {
    'Content-type': 'multipart/form-data',
  },
} );

export const loginUser = async data => authUser( '/login', data );
