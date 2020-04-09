const SERVER_PORT = process.env.PORT ||3000
const PROFILE_PICTURE_PATH = `http://localhost:${ SERVER_PORT }/profilePicture`;

module.exports = {
  PROFILE_PICTURE_PATH,
  SERVER_PORT
};

