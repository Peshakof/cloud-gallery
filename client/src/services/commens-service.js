import axios from 'axios';

const host = 'http://localhost:8000/api';

const commentsRequester = {
  postComment: (comment) => {
    return axios.post(`${host}/comments/add`, comment);
  },

  getAllComments: (id) => {
    return axios.get(`${host}/comments/getAll/${id}`);
  }
}

export default commentsRequester;