const { validationResult } = require('express-validator');
const fs = require('fs');
const HttpError = require('../models/http-error');
const Category = require('../models/categories');

const getCategories= async (req, res, next) => {
  let allcategories;
  try {
    allcategories = await Category.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching categories failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!allcategories || allcategories.length === 0) {
    return next(new HttpError('No categories found.', 404));
  }

  res.json({
    categories: allcategories.map((category) => category.toObject({ getters: true })),
  });
  // console.log("DEBUG -- categories-Controller - Fetching all the categories successful!");
};

const createCategory = async (req, res, next) => {
  console.log("DEBUG -- categories-controller.js -- 0");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("DEBUG -- categories-controller.js -- 0.1: ");
    return next(
      new HttpError('Invalid inputs passed, please check your data!', 422)
    );
  }
  const { name } = req.body;

  console.log("DEBUG -- categories-controller.js -- 1");

  const createdcategory = new Category({
    name,
    image: req.file.path
  });
  console.log("DEBUG -- categories-controller.js -- 2");
  try {
    await createdcategory.save(); // Save the new category instance
    console.log("DEBUG -- categories-controller.js -- 2.1: Saved category in database");
  } catch (err) {
    // console.log(err);
    const error = new HttpError(
      'Creating category failed[2], please try again.', 500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ category: createdcategory });
  console.log("DEBUG -- categories-controller.js -- 7: everything works fine");
};

// const updateCategory = async (req, res, next) => {
// 	const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError('Invalid inputs passed, please check your data.', 422)
//     );
//   }

// 	const { title, description } = req.body;
// 	const categoryId = req.params.pid;

// 	let category;
//   try {
//     category = await category.findById(categoryId);
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong[1], could not update category.',
//       500
//     );
//     return next(error);
//   }

//   if (category.creator.toString() !== req.userData.userId) {
//     const error = new HttpError('You are not allowed to edit this place.', 401);
//     return next(error);
//   }

// 	category.title = title;
// 	category.description = description;

// 	try {
//     await category.save();
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong[2], could not update category.', 500
//     );
//     return next(error);
//   }
	
// 	res.status(200).json({ category: category.toObject({ getters: true }) });
// };

// const deleteCategory = async (req, res, next) => {
// 	const categoryId = req.params.pid;

// 	let category;
//   try {
//     category = await category.findById(categoryId).populate('creator');;
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong[3], could not find category to delete. [1]',
//       500
//     );
//     return next(error);
//   }

//   if (!category) {
//     const error = new HttpError('Could not find category for this id.', 404);
//     return next(error);
//   }

//   if (category.creator.id !== req.userData.userId) {
//     const error = new HttpError(
//       'You are not allowed to delete this category.',
//       401
//     );
//     return next(error);
//   }

//   const imagePath = category.image;

//   try {
//     // const sess = await mongoose.startSession();
//     // sess.startTransaction();
//     // await category.remove({ session: sess });
//     // category.creator.categorys.pull(category);
//     // await category.creator.save({ session: sess });
//     // await sess.commitTransaction();

//     await category.remove();
//     category.creator.categorys.pull(category);
//     await category.creator.save();
//   } 
//   catch (err) {
//     const error = new HttpError(
//       'Something went wrong[4], could not delete category.',
//       500
//     );
//     return next(error);
//   }

//   fs.unlink(imagePath, err => {
//     console.log(err);
//   });

//   res.status(200).json({ message: 'Deleted category.' });
// };

module.exports = {
  getCategories,
  createCategory
	// updateCategory,
	// deleteCategory
};