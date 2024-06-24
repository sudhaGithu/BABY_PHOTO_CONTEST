const express = require('express');
const router = express.Router();

const termsAndConditionsController = require('../controllers/termsAndConditions')
const rulesController = require('../controllers/rulesController')
const homeController = require('../controllers/homeController')
const authUser = require('../middleware/authenticateToken')

router.use(express.json());

router.get('/viewallrules',authUser, rulesController.getAllRules);

router.get('/viewTermsAndConditions',authUser, termsAndConditionsController.gettermsAndConditions);

router.get('/viewallHome',authUser, homeController.getAllHome);

module.exports = router;