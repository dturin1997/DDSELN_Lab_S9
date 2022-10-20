const express = require('express');
import { generateUploadURL } from './s3.js'
const app = express();
const router = express.Router();
const db = require('./db');
const contactos = require('./routes/contactos');

const path = __dirname + '/views/';
//const port = process.env.PORT || 6005;
const port = 6005;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));
app.use('/contactos', contactos);

app.use(express.static('front'))

app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
