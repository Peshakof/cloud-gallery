const db = require('./config/db');

db.then(() => {
  console.log('Connected to db successfully');
  require('./config/main');
})