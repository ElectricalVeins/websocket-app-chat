import axios          from 'axios';
import { ACCESS_KEY } from "../../constants";

const http = axios.create( {
  baseURL: 'http://localhost:3030/api',
} );

http.interceptors.request.use( config => {
  config.headers.authorization = sessionStorage.getItem( ACCESS_KEY );
  return Promise.resolve( config );
} );

http.interceptors.response.use( response => Promise.resolve( response ),
  error => {return Promise.reject( error );} );

export default http;