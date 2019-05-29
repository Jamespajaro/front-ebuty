import Axios from 'axios';

const RESOURCE_NAME = '/messages';

export default {
  getAll() {
    return Axios.get(RESOURCE_NAME);
  },

  get(id) {
    return Axios.get(`${RESOURCE_NAME}/${id}`);
  },

  create(data) {
    return Axios.post(RESOURCE_NAME, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  delete(id) {
    return Axios.delete(`${RESOURCE_NAME}/${id}`);
  },
};
