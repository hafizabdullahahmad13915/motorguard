const express = require('express');
const router = express.Router();
const { getDiagnostics, createTechRecord, listTechRecords } = require('../controllers/techController');

router.get('/diagnostics', getDiagnostics);
router.get('/list', listTechRecords);
router.post('/record', createTechRecord);

module.exports = router;