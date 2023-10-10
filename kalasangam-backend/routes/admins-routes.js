const express = require('express');
// const { check } = require('express-validator');

const adminsController = require('../controllers/admins-controller');

const router = express.Router();

router.get('/:aid', adminsController.getAdmin)
router.post('/adminLogin', adminsController.adminLogin);

module.exports = router;