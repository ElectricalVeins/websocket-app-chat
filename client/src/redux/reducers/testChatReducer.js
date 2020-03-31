const initialState = {
  chats: {},
  selectedChat: null,

};

export default function testChatReducer (state = initialState, action) {

  switch (action.type) {

    case 'LOAD_CHAT_MESSAGES_SUCCESS': {
      const { chatId, messages } = action;
      const newState = {
        ...state,
      };
      /*
       * так как users это объекты т.е. ссылочные типы,
       *  лишнюю память мы отнимать не будем
       * и поиск автора будет осуществлен один раз
       * */
      const newMessagesWithAuthors = messages.map(
        msg => ( {
          ...msg,
          author: chat.users.find(usr => usr._id === msg.authorId),
        } ));

      /*
       * chats - object
       * */
      const chat = newState.chats[ chatId ];
      chat.messages = [...chat.messages, ...newMessagesWithAuthors];

      return newState;
    }

    default:
      return state;
  }
}

