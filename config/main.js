const express = require('express');
const config = require('./config');
const apiRouter = require('../api');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

const React = require('react');
const ReactDOMServer = require('react-dom/server')
const App = require('../client/src/App');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser(321321));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    fs.readFile(path.resolve('client/build/index.html'), 'UTF-8', (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Something went wrong!');
      }
      return res.send(data.replace(
        '<div id="root"></div>',
         `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`))
    })
  });
}
  
app.listen(config.port, () => {
  console.log(`Server: Listening on ${config.port}`);
});