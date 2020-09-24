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
    },

    removeImage: (id, userId) => {
        return axios.put(`${host}/images/remove/${id}`, {userId});
    },

    editImage: (id, image) => {
        return axios.put(`${host}/images/edit/${id}`, {image});
    }
}

export default imageRequester;