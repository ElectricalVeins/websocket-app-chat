const path = require( 'path' );
const fs = require( 'fs' );
const multer = require( 'multer' );

const storage = multer.diskStorage( {
  destination: function ( req, file, cb ) {

    const fileDestination = path.resolve( __dirname,
      '..', '..', 'uploads', 'profilePicture' );

    if( !fs.existsSync( fileDestination ) ) {
      fs.mkdirSync( fileDestination,
        { recursive: true } );
    }

    cb( null, fileDestination );
  },
  filename: function ( req, file, cb ) {

    const extension = path.extname( file.originalname );
    const newFileName = `${Date.now()}${extension}`;
    cb( null, newFileName );
  },
} );

module.exports.saveProfilePicture = multer( {
  storage,
} ).single( 'profilePicture' );

