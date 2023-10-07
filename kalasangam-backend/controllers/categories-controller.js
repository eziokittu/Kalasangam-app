const { validationResult } = require('express-validator');
const fs = require('fs');
const HttpError = require('../models/http-error');
const Category = require('../models/categories');

const getCategoriesById= async (req, res, next) => {
  const categoryId = req.params.cid;

  let category;
  try {
    category = await Category.findById(categoryId);
  } catch (err) {
    const error = new HttpError(
      'Fetching categories failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!category) {
    return next(new HttpError('No category found.', 404));
  }

  res.json({
    category: category.toObject({ getters: true }),
  });
  console.log("DEBUG -- categories-Controller.js - Fetching a category by Id successful!");
};

const getCategories= async (req, res, next) => {
  let allcategories;
  try {
    // allcategories = await Category.find();
    // this finds all the categories except this specific object id (for the default np specific category)
    allcategories = await Category.find( {_id:{$ne:"651e53ef442d9fced87c61e3"} })
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

const getCategoryNames= async (req, res, next) => {
  let allcategories;
  try {
    // to get only the name attribute
    allcategories = await Category.find({}, 'name').exec();
  } catch (err) {
    const error = new HttpError(
      'Fetching category names failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!allcategories || allcategories.length === 0) {
    return next(new HttpError('No categories found.', 404));
  }

  // iterating the array of objects of categories, and extracting only the individual names
  let allNames = []
  for (let i = 0; i < allcategories.length; i++) {
    allNames.push(allcategories[i].name);
  }

  if (allNames.length === 0){
    allNames.push('all');
  }

  // console.log("no of categories: "+allNames.length);

  res.json({
    // categoryNames: allNames.map((categoryNames) => toString(categoryNames)),
    categoryNames: allNames
  });
  // console.log("DEBUG -- categories-Controller - Fetching all the categories successful!");
};

const createCategory = async (req, res, next) => {
  // console.log("DEBUG -- categories-controller.js -- 0");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log("DEBUG -- categories-controller.js -- 0.1: ");
    return next(
      new HttpError('Invalid inputs passed, please check your data!', 422)
    );
  }
  const { name } = req.body;

  // console.log("DEBUG -- categories-controller.js -- 1");

  const createdcategory = new Category({
    name,
    image: req.file.path
  });
  // console.log("DEBUG -- categories-controller.js -- 2");
  try {
    await createdcategory.save(); // Save the new category instance
    // console.log("DEBUG -- categories-controller.js -- 2.1: Saved category in database");
  } catch (err) {
    // console.log(err);
    const error = new HttpError(
      'Creating category failed[2], please try again.', 500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ category: createdcategory });
  console.log("DEBUG -- categories-controller.js -- 7: Category Successfully created!");
};

const updateCategory = async (req, res, next) => {
	const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

	const { name } = req.body;
	const categoryId = req.params.cid;

	let category;
  try {
    category = await Category.findById(categoryId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong[1], could not update category.',
      500
    );
    return next(error);
  }

  // if (category.creator.toString() !== req.userData.userId) {
  //   const error = new HttpError('You are not allowed to edit this place.', 401);
  //   return next(error);
  // }

	category.name = name;
	// category.image = req.file.path;

	try {
    await category.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong[2], could not update category.', 500
    );
    return next(error);
  }
	
	res.status(200).json({ category: category.toObject({ getters: true }) });
  console.log("DEBUG -- categories-controller.js -- 7: Category updated!");
};

const deleteCategory = async (req, res, next) => {
	const categoryId = req.params.cid;
  // console.log('DEBUG -- categories-controller.js -- 1: cid='+categoryId);
	let category;
  try {
    // console.log('DEBUG -- categories-controller.js -- 1.1');
    category = await Category.findById(categoryId);
    // console.log('DEBUG -- categories-controller.js -- 1.2');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong[3], could not find category to delete. [1]',
      500
    );
    return next(error);
  }
  // console.log('DEBUG -- categories-controller.js -- 3');

  if (!category) {
    const error = new HttpError('Could not find category for this id.', 404);
    return next(error);
  }

  // if (category.creator.id !== req.userData.userId) {
  //   const error = new HttpError(
  //     'You are not allowed to delete this category.',
  //     401
  //   );
  //   return next(error);
  // }

  const imagePath = category.image;

  try {
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    // await category.remove({ session: sess });
    // category.creator.categorys.pull(category);
    // await category.creator.save({ session: sess });
    // await sess.commitTransaction();

    await category.remove();
    // category.creator.categorys.pull(category);
    // await category.creator.save();
  } 
  catch (err) {
    const error = new HttpError(
      'Something went wrong[4], could not delete category.',
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, err => {
    console.log(err);
  });

  res.status(200).json({ message: 'Deleted category.' });
  // console.log('DEBUG -- categories-controller.js -- 5: Deleted Category');
};

module.exports = {
  getCategories,
  getCategoriesById,
  getCategoryNames,
  createCategory,
	updateCategory,
	deleteCategory
};