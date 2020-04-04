const server=require('./boot/configureHTTPServer');
const socket =require('./boot/configureSocketIO');

const PORT = process.env.PORT || 3030;
/*
 * start server
 * */
server.listen( PORT, () =>
  console.log( `App listening on port ${PORT}!` ),
);






