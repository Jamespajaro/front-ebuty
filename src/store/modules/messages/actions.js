import types from './mutations-type';
import service from '../../../services';

const sendMessage = async function sendMessage({ commit }, payload) {
  const { data } = await service.Messages.create(payload);
  if (data.lenght !== 0) {
    commit(types.SET_MESSAGE, data);
  }
};

const setMessage = async function setMessage({ commit }, payload) {
  commit(types.SET_MESSAGE, payload);
};

const getAllMessages = async function getAllMessages({ commit }) {
  const { data } = await service.Messages.getAll();
  if (data.lenght !== 0) {
    commit(types.GET_MESSAGES, data);
  }
};

const deleteMessage = async function deleteMessage({ commit }, { _id }) {
  const { data } = await service.Messages.delete(_id);
  if (data.lenght !== 0) {
    commit(types.GET_MESSAGES, data);
  }
};

export default {
  sendMessage,
  getAllMessages,
  setMessage,
  deleteMessage,
};
