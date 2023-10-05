const express = require('express');
const { check } = require('express-validator');
const categoriesController = require('../controllers/categories-controller');
const fileUpload = require('../middlewares/file-upload');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

// GET requests
router.get('/get-categories/:cid', categoriesController.getCategoriesById)
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

// UPDATE requests
router.patch(
  '/:cid',
//   fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty()
	  .isLength({ min: 3 })
  ],
  categoriesController.updateCategory
);

// DELETE requests
router.delete('/:cid', categoriesController.deleteCategory);

module.exports = router;