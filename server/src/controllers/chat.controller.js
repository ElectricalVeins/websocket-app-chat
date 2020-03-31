const Chat = require('../models/Chat.js');
const User = require('../models/User.js');
const {BadRequestError} = require('../utils/errors');

module.exports.createChat = async (req, res, next) => {
    try {

        const {headers: {authorization: userId,}, body: {name}} = req;

        const chat = await Chat.create({
            name,
            owner: userId,
            users: userId,
        });

        if (chat) {
            return res.status(201).send(chat);
        }

        next(new BadRequestError());
    } catch (e) {
       next(e)
    }
};

module.exports.getChatByUserId = async (req, res, next) => {
    try {
        const {headers: {authorization: userId}} = req;
        const chats = await Chat.find({
            users: {
                    _id: userId
                },
        },{
            _v:0,
            messages:0
        })
            .populate('users', {
                chats: 0,
            })
            .populate('owner', {
                chats: 0,
            });
        if (chats) {
            return res.send(chats);
        }
        next(new BadRequestError());
    } catch (e) {
        next(e);
    }
};

module.exports.getChatById = async (req, res, next) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
            .populate('users', {
                chats: 0,
            })
            .populate('owner', {
                chats: 0,
            });
        if (chat) {
            return res.send(chat);
        }
        next(new BadRequestError());
    } catch (e) {
        next(e);
    }
};

module.exports.joinToChat = async (req, res, next) => {
    try {
        const {headers: {authorization: userId}, chat} = req;

        chat.users.addToSet(userId);
        const savedChat = await chat.save();
        if (savedChat) {
            const chatWithOwner = await Chat.findOne(chat,{
                messages:0
            })
                .populate('owner', {
                    login: 1,
                })
                .populate('users', {
                    login: 1,
                });
            return res.send(chatWithOwner);
        }

        next(new BadRequestError());
    } catch (e) {
        next(e)
    }
};

module.exports.leaveChat = async (req, res, next) => {
    try {
        const {headers: {authorization: userId}, chat} = req;

        chat.users.remove(userId);
        const savedChat = await chat.save();
        if (savedChat) {
            const chatWithOwner = await Chat.findOne(chat,{
                _id:true,
                name:true,
            })
                .populate('owner', {
                    password: 0,
                })
                .populate('users', {
                    password: 0,
                });
            return res.send(chatWithOwner);
        }
        next(new BadRequestError());
    } catch (e) {
        next(e)
    }
};

module.exports.createMessage = async (req, res, next) => {
    try {
        const {headers: {authorization: userId}, chat} = req;

        const message = {
            authorId: userId,
            body: req.body.messageBody,
        };

        chat.messages.push(message);

        const savedMessage = await chat.save();
        if (savedMessage) {
            return res.status(201).send(savedMessage);
        }
        next(new BadRequestError());
    } catch (e) {
        next(e)
    }
};

module.exports.getMessages = async (req, res, next) => {
    try {
        const {chat: {messages,users},chat} = req;

        if (chat) {
            return res.status(200).send({
                messages,
                users
            })
        }
        next(new BadRequestError());
    } catch (e) {
        next(e)
    }
};

module.exports.getAllChats=async(req,res,next)=>{
    try {
        const chats = await Chat.find({},{
            _v:0,
            messages:0
        });
        if (chats) {
            return res.send(chats);
        }
        next(new BadRequestError());
    } catch (e) {
        next(e);
    }
}