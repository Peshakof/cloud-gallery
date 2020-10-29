const express = require('express');
const config =require('./config');
const apiRouter = require('../api');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser(321321));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static( 'client/build' ));

}

app.listen(config.port, () => {
  console.log(`Server: Listening on ${config.port}`);
});