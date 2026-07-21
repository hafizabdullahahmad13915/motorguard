const TollRecord = require('../models/TollRecord');

async function getLatestAnprCapture(req, res) {
  try {
    let record = await TollRecord.findOne().sort({ createdAt: -1 });
    if (!record) {
      record = await TollRecord.create({
        plateNumber: 'LEB-1234',
        status: 'pending_challan',
        speed: 132,
        postedLimit: 120,
        location: 'M-2 Toll Gate 04',
        cameraId: 'CAM-02',
        confidence: 97.4,
        fineAmount: 2500,
        violationType: 'Speeding'
      });
    }
    res.json({
      plateNumber: record.plateNumber,
      status: record.status,
      speed: `${record.speed} km/h`,
      postedLimit: record.postedLimit,
      location: record.location,
      cameraId: record.cameraId,
      confidence: record.confidence,
      fineAmount: record.fineAmount,
      violationType: record.violationType,
      settled: record.settled
    });
  } catch (err) {
    console.error('Toll controller error:', err);
    res.status(500).json({ message: 'Unable to load toll capture data.', error: err.message });
  }
}

async function createTollRecord(req, res) {
  try {
    const body = req.body;
    const record = await TollRecord.create(body);
    res.status(201).json(record);
  } catch (err) {
    console.error('Toll create error:', err);
    res.status(500).json({ message: 'Unable to create toll record.', error: err.message });
  }
}

async function listTollRecords(req, res) {
  try {
    const records = await TollRecord.find().sort({ createdAt: -1 }).limit(20);
    res.json(records);
  } catch (err) {
    console.error('Toll list error:', err);
    res.status(500).json({ message: 'Unable to load toll records.', error: err.message });
  }
}

module.exports = { getLatestAnprCapture, createTollRecord, listTollRecords };
