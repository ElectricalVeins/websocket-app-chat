const server=require('./boot/configureHTTPServer');
const socket =require('./boot/configureSocketIO');
const { SERVER_PORT }=require('./constants')

//start server

server.listen( SERVER_PORT, () =>
  console.log( `App listening on port ${SERVER_PORT}!` ),
);






