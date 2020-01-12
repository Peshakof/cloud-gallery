const mogoose = require('mongoose');
const config = require('./config');

module.exports = mongoose.connect( process.env.MONGODB_URI || config.dbURL, { useNewUrlParser: true });