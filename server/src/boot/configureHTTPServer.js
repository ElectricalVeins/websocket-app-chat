const { Server } = require( 'http' );
const app = require('./configureExpress');

const server = new Server( app );

module.exports=server;