import Axios from 'axios';
import Messages from './MessagesService';

Axios.defaults.baseURL = 'http://localhost:3000/';

const services = {
  Messages,
};

export default services;
