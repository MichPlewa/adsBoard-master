const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
require('dotenv').config({ path: './.env' });

const ads = require('./routes/ads.routes');
const users = require('./routes/users.routes');

let uriDB = process.env.DB_URI;
let secretKey = 'xfys2';

const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

mongoose.connect('mongodb://localhost:27017/ads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => console.log('Connected to database'));
db.on('error', (err) => {
  console.log('error by connecting to db', err);
});

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(
  session({
    secret: secretKey,
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, '/public')));
app.use((req, res, next) => {
  console.log(req.originalUrl, req.method);
  next();
});
app.use('/api', ads);
app.use('/api/auth', users);

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Hej' });
});

app.use((err, req, res) => {
  res.status(500).json({ message: err });
});

module.exports = server;
