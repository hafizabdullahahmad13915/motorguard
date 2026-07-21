const express = require('express');
const router = express.Router();
const { getLatestAnprCapture, createTollRecord, listTollRecords } = require('../controllers/tollController');

router.get('/anpr-capture', getLatestAnprCapture);
router.get('/list', listTollRecords);
router.post('/record', createTollRecord);

module.exports = router;