const express = require('express');
const router = express.Router();

const termsAndConditionsController = require('../controllers/termsAndConditions')
const rulesController = require('../controllers/rulesController')
const homeController = require('../controllers/homeController')

router.use(express.json());

router.get('/viewallrules', rulesController.getAllRules);

router.get('/viewTermsAndConditions', termsAndConditionsController.gettermsAndConditions);

router.get('/viewallHome', homeController.getAllHome);

module.exports = router;