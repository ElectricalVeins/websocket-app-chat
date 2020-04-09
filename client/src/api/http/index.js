import axios                       from 'axios';
import { ACCESS_KEY, CLIENT_PORT } from "../../constants";

const http = axios.create( {
  baseURL: `http://localhost:${CLIENT_PORT}/api`,
} );

http.interceptors.request.use( config => {
  config.headers.authorization = sessionStorage.getItem( ACCESS_KEY );
  config.headers.contentType='application/json'
  return Promise.resolve( config );
} );

http.interceptors.response.use( response => Promise.resolve( response ),
  error => {return Promise.reject( error );} );

export default http;