import { forEach } from 'lodash';

const setMessage = function setMessage(state, message) {
  forEach(message.images, (image) => {
    image.url = `http://localhost:3000/${image.url}`;
  });
  state.message = message;
};

const getMessages = function getMessages(state, messages) {
  state.messages = messages;
};

export default { setMessage, getMessages };
