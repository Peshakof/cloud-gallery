// const env = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV || 'production';

const config = {
  development: {
    port: process.env.PORT || 8000,
    dbURL: 'mongodb://localhost:27017/cloud-gallery',
    authCookieName: 'x-auth-token'
  },
  production: {
    port: process.env.PORT || 8000,
    dbURL: 'mongodb+srv://Peshakof:CJUKceRtCV3PnjxP@peshakof2020.oglek.mongodb.net/cloud-gallery?retryWrites=true&w=majority',
    authCookieName: 'x-auth-token'
  }
}

module.exports = config[env];