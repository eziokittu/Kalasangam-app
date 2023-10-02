// const { validationResult } = require('express-validator');

// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const Admin = require('../models/admin');

const adminLogin = async (req, res, next) => {
	const { name, password } = req.body;
	// console.log("DEBUG -- admins-controller.js -- 1 -- name: "+name+", password: "+password);
	let existingAdmin;
	try {
		existingAdmin = await Admin.findOne({ name: name });
	} catch (err) {
		const error = new HttpError(
			'Admin login failed, please try again later.',
			500
		);
		return next(error);
	} if (!existingAdmin) {
		const error = new HttpError(
			'Invalid credentials, could not log you in. [ name didnt match: ' + {name} + ' ]',
			403
		);
		return next(error);
	}

	// console.log("DEBUG -- admins-controller.js -- 2");

	let isValidPassword = false;
	try {
		// console.log("DEBUG -- admins-controller.js -- 2.1: "+password + " " +existingAdmin.password);
		isValidPassword = (password === existingAdmin.password ? true : false);
		// isValidPassword = await bcrypt.compare(password, existingAdmin.password);
	} catch (err) {
		const error = new HttpError(
			'Could not log you in, please check your credentials and try again.',
			500
		);
		return next(error);
	} if (!isValidPassword) {
		const error = new HttpError(
			'Invalid credentials, could not log you in. [ password didnt match: ' + {password} + ' ]',
			403
		);
		return next(error);
	}

	// console.log("DEBUG -- admins-controller.js -- 3");

	let token;
	try {
		// console.log("DEBUG -- admins-controller.js -- 4: "+existingAdmin.id);
		token = jwt.sign(
			{ userId: existingAdmin.id, email: existingAdmin.email },
			'supersecret_dont_share',
			{ expiresIn: 60 * 10 }
		);
	} catch (err) {
		const error = new HttpError(
			'Logging in failed, please try again later.',
			500
		);
		return next(error);
	}

	// console.log("DEBUG -- admins-controller.js -- 4");

	res.json({
		userId: existingAdmin.id,
		name: existingAdmin.name,
		password: existingAdmin.password,
		token: token
	});
};
  
module.exports = {
	adminLogin
};