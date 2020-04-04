const path = require( 'path' );
const express = require( 'express' );
const cors = require( 'cors' );
const router = require( '../router' );
const handleUserError=require('../middleware/errorHandler');

const app = express();

app.use( cors() );
app.use( express.json() );
/*
 * static files
 */
app.use( express.static( path.join( __dirname, '../../uploads' ) ) );
/*
 * http routing
 */
app.use( '/api', router );
/*
 * error handler
 */
app.use( handleUserError,
  ( err, req, res, next ) => {
    res.status( 500 ).send( err );
  } );

module.exports = app;