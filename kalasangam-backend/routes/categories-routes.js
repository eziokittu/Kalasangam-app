const express = require('express');
const { check } = require('express-validator');
const categoriesController = require('../controllers/categories-controller');
const fileUpload = require('../middlewares/file-upload');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

// GET requests
router.get('/get-categories', categoriesController.getCategories)
router.get('/get-names', categoriesController.getCategoryNames)

router.use(checkAuth);

// POST requests
router.post(
	'/create-category', 
	fileUpload.single('image'),
	[
	check('name')
		.not()
		.isEmpty()
	], 
	categoriesController.createCategory
);

// // UPDATE requests
// router.patch(
//   '/:pid',
//   [
//     check('title')
//       .not()
//       .isEmpty(),
//     check('description').isLength({ min: 5 })
//   ],
//   productsController.updateProduct
// );

// // DELETE requests
// router.delete('/:pid', productsController.deleteProduct);

module.exports = router;