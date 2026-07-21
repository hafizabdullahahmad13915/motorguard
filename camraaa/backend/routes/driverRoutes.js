const express = require('express');
const router = express.Router();
const { getDriverEvidence, createDriverRecord, listDriverRecords } = require('../controllers/driverController');

router.get('/evidence', getDriverEvidence);
router.get('/list', listDriverRecords);
router.post('/record', createDriverRecord);

module.exports = router;