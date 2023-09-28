const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join('uploads', '')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

// app.use(express.urlencoded({extended: true}));
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// mongoDB connection URI
// const uriDB = 'mongodb+srv://eziokittu:southpoint19@cluster0.nmjiwwv.mongodb.net/kalasangam'; // ATLAS
const uriDB = 'mongodb://localhost:27017/kalasangam'; // community server
mongoose
  .connect(uriDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>{
    app.listen(5000);
    console.log("LOG - Server running on port 5000");
  })
  .catch(err => {
    console.log(err);
    console.log("LOG - Server failed to connect");
  });