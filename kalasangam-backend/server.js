const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

// const multer = require('multer'); // For handling file uploads
// const path = require('path');

const app = express();

const frontendPort = 3003;
app.use(
	cors({
		origin: 'http://localhost:'+frontendPort, // Replace with your frontend's URL
		methods: ['GET', 'POST'], // Specify allowed HTTP methods
		credentials: true, // Allow sending cookies and authentication headers
	})
);

// // Configure body parser
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/catalog', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define the product schema and model
// const productSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   imageUrl: String,
// });
// const Product = mongoose.model('Product', productSchema);

// // API to create a new product
// app.post('/api/products', upload.single('image'), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const imageUrl = req.file.path; // Multer stores uploaded file path in req.file.path
//     const newProduct = new Product({ title, description, imageUrl });
//     await newProduct.save();
//     res.status(201).json({ message: 'Product created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating product' });
//   }
// });

// // API to get all products
// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products' });
//   }
// });

// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

app.use(bodyParser.json());
// app.use(express.urlencoded({extended: true}));
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
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