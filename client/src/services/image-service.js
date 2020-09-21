import axios from 'axios';

const host = 'http://localhost:8000/api';

const imageRequester = {
    getAllUserImages: (userId) => {
        return axios.get(`${host}/images/getImages/${userId}`);
    },

    getAll: () => {
        return axios.get(`${host}/images/getAll`);
    },

    getCurrentImage: (id) => {
        return axios.get(`${host}/images/image-info/${id}`);
    },

    uploadImage: (image) => {
        return axios.post(`${host}/images/uploadImage`, image);
    }
}

export default imageRequester;