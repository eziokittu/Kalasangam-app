const express = require('express');
// const { check } = require('express-validator');

const adminsController = require('../controllers/admins-controller');

const router = express.Router();

// router.post(
//   '/adminSignup',
//   [
//     check('name')
//       .not()
//       .isEmpty(),
//     check('password')
//     	.isLength({ min: 1 })
//   ],
//   adminsController.adminSignup
// );

router.post('/adminLogin', adminsController.adminLogin);

module.exports = router;