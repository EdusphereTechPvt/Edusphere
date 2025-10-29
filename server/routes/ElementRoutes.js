const express = require('express');
const { getElement, addElement } = require('../controllers/ElementAccessController');

const router = express.Router();

router.post('/getElement', getElement);
router.post('/addElement', addElement);

module.exports = router;