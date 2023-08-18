const express = require('express');
const bodyParser = require('body-parser')

const productsRoutes = require('./routes/products_routes');
const app = express();

app.use('/api/products', productsRoutes);
app.listen(5000);