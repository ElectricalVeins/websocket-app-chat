const { BadRequestError } = require('../utils/errors');
const { User } = require('./../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    if (user) {
      const preparedUser = user.toObject();
      delete preparedUser.password;
      delete preparedUser._id;

      return res.status(201).send(preparedUser);
    }

    next(new BadRequestError());

  } catch (e) {
    next(e);
  }
};

module.exports.getUserByID = async ( req, res, next ) => {
  try {
    const user = await User.findById( req.params.id, {
      __v: false,
      password:false,
    } )
    if( user ) {
      return res.send( user );
    }
    next(new BadRequestError());

  } catch ( e ) {
    next( e );
  }
};

module.exports.updateUserById = async ( req, res, next ) => {
  try {
    const { params: { id }, body } = req;

    const updatedUser = await User.findByIdAndUpdate( id, body, { new: true } );
    if( updatedUser ) {
      return res.send( updatedUser );
    }

    next(new BadRequestError());

  } catch ( e ) {
    next( e );
  }
};

module.exports.deleteUserById = async ( req, res, next ) => {
  try {
    const { params: { id } } = req;

    const deletedUser = await User.findByIdAndDelete( id );
    if( deletedUser ) {
      return res.send( deletedUser );
    }

    next(new BadRequestError());

  } catch ( e ) {
    next( e );
  }
};
