const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const fs = require('fs');
const HttpError = require('../models/http-error');
const Product = require('../models/product');
const User = require('../models/user');

const getProducts = async (req, res, next) => {
  let allProducts;
  try {
    allProducts = await Product.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching products failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!allProducts || allProducts.length === 0) {
    return next(new HttpError('No products found.', 404));
  }

  res.json({
    products: allProducts.map((product) => product.toObject({ getters: true })),
  });
  // console.log("DEBUG -- Products-Controller - Fetching all the products successful!");
};

const getProductById = async (req, res, next) => {
	const productId = req.params.pid;

	let product;
  try { 
		product = await Product.findById(productId);
	}
	catch (err) {
		const error = new HttpError(
			'Something went wrong, could not find a product!', 500
		);
		return next(error);
	}

  if (!product) {
    const error = new HttpError(
			'Could not find a product for the provided id.', 404
		);
		return next(error);
  }

  res.json({ product: product.toObject({ getters: true}) }); // => { product } => { product: product }
};

const getProductsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  // console.log("DEBUG -- products-controller -- working 1: userId = "+userId);
  // let products;
  let userWithProducts;
  try {
    userWithProducts = await User.findById(userId).populate('products');
    // console.log("DEBUG -- products-controller -- working 2");
  } catch (err) {
    const error = new HttpError(
      'Fetching products failed, please try again later',
      500
    );
    return next(error);
  }

  // console.log("DEBUG -- products-controller -- working 3");
  // if (!products || products.length === 0) {
  if (!userWithProducts || userWithProducts.products.length === 0) {
    return next(
      new HttpError('Could not find products for the provided user id.', 404)
    );
  }

  // console.log("DEBUG -- products-controller -- working 4");
  res.json({
    products: userWithProducts.products.map(product =>
      product.toObject({ getters: true })
    )
  });
  // console.log("DEBUG -- Products-Controller - Fetching all the USER's products successful!");
};

const createProduct = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
    return next(
		  new HttpError('Invalid inputs passed, please check your data!', 422)
    );
  }
	const { title, description, category } = req.body;

  // Ensure that req.userData.userId contains a valid ObjectId of an existing user
  // console.log('DEBUG ---- 1: User ID:', req.userData.userId);

	const createdProduct = new Product ({
		title,
		description,
    image: req.file.path,
    category,
		creator: req.userData.userId
	});
  // console.log("DEBUG ---- 2");
  // check if the user id provided exists or not
  let user;
  try{
    user = await User.findById(req.userData.userId);
    // console.log("DEBUG ---- 3: ");
  }
  catch (err) {
    // console.log("DEBUG ---- 4: " + err);
    const error = new HttpError(
      'Creating product failed[01], please try again!', 500
    );
    // console.log(err);
    return next(error);
  } 
  if (!user) {
    const error = new HttpError(
      'Cannot find user for the provided id', 404
    );
    return next(error);
  }
  // console.log("DEBUG ---- 5: "+user);

	try {
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    // await createdProduct.save({ session: sess });
    // user.products.push(createdProduct);
    // await user.save({ session: sess, validateModifiedOnly: true, });
    // await sess.commitTransaction();

    await createdProduct.save( /* { session: session } */ );
    user.products.push(createdProduct);
    await user.save( /* { session: session } */ );
    // console.log("DEBUG --- 6: Saved product in database");
  } 
	catch (err) {
		// console.log(err);
    const error = new HttpError(
      'Creating product failed[2], please try again.', 500
    );
    console.log(err);
    return next(error);
  }
	
	res.status(201).json({product: createdProduct});
  // console.log("DEBUG --- 7: everything works fine");
};

const updateProduct = async (req, res, next) => {
	const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

	const { title, description } = req.body;
	const productId = req.params.pid;

	let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong[1], could not update product.',
      500
    );
    return next(error);
  }

  if (product.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this place.', 401);
    return next(error);
  }

	product.title = title;
	product.description = description;

	try {
    await product.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong[2], could not update product.', 500
    );
    return next(error);
  }
	
	res.status(200).json({ product: product.toObject({ getters: true }) });
};

const deleteProduct = async (req, res, next) => {
	const productId = req.params.pid;

	let product;
  try {
    product = await Product.findById(productId).populate('creator');;
  } catch (err) {
    const error = new HttpError(
      'Something went wrong[3], could not find product to delete. [1]',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError('Could not find product for this id.', 404);
    return next(error);
  }

  if (product.creator.id !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delete this product.',
      401
    );
    return next(error);
  }

  const imagePath = product.image;

  try {
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    // await product.remove({ session: sess });
    // product.creator.products.pull(product);
    // await product.creator.save({ session: sess });
    // await sess.commitTransaction();

    await product.remove();
    product.creator.products.pull(product);
    await product.creator.save();
  } 
  catch (err) {
    const error = new HttpError(
      'Something went wrong[4], could not delete product.',
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, err => {
    console.log(err);
  });

  res.status(200).json({ message: 'Deleted product.' });
};

module.exports = {
  getProducts,
	getProductById,
	getProductsByUserId,
	createProduct,
	updateProduct,
	deleteProduct
};