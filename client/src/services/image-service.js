import axios from 'axios';

const host = 'http://localhost:8000/api';

const imageRequester = {
    getAllImages: (userId) => {
        return axios.get(`${host}/images/getImages/${userId}`);
    },

    uploadImage: (image) => {
        return axios.post(`${host}/images/uploadImage`, image);
    }
}

export default imageRequester;