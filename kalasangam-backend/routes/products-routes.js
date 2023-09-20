const express = require('express');
const { check } = require('express-validator');
const productsController = require('../controllers/products-controllers');
const router = express.Router();

// GET requests
router.get('/', productsController.getProducts)
router.get('/:pid', productsController.getProductById);
router.get('/user/:uid', productsController.getProductsByUserId);

// POST requests
router.post(
	'/', 
	[
	check('title')
		.not()
		.isEmpty(),
	check('description')
		.isLength({min: 2})
	], 
	productsController.createProduct
);

// UPDATE requests
router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  productsController.updateProduct
);

// DELETE requests
router.delete('/:pid', productsController.deleteProduct);

module.exports = router;