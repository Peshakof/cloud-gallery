import axios from 'axios';

const host = 'http://localhost:8000/api';

const imageRequester = {
    getAllUserImages: (userId) => {
        return axios.get(`${host}/images/getImages/${userId}`);
    },

    getAll: () => {
        return axios.get(`${host}/images/getAll`);
    },

    uploadImage: (image) => {
        return axios.post(`${host}/images/uploadImage`, image);
    }
}

export default imageRequester;