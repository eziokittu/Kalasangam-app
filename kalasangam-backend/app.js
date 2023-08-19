const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer'); // For handling file uploads
const path = require('path');
const cors = require('cors'); // Import the cors package

app.use(
	cors({
		origin: 'http://localhost:3000', // Replace with your frontend's URL
		methods: ['GET', 'POST'], // Specify allowed HTTP methods
		credentials: true, // Allow sending cookies and authentication headers
	})
);

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/catalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the product schema and model
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
});
const Product = mongoose.model('Product', productSchema);

// API to create a new product
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file.path; // Multer stores uploaded file path in req.file.path
    const newProduct = new Product({ title, description, imageUrl });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// API to get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
