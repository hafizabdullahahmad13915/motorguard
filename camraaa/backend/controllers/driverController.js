const DriverRecord = require('../models/DriverRecord');

async function getDriverEvidence(req, res) {
  try {
    let driver = await DriverRecord.findOne().sort({ createdAt: -1 });
    if (!driver) {
      driver = await DriverRecord.create({
        driverName: 'Ahmed Raza',
        cnic: '35202-1234567-1',
        plateNumber: 'PUNJAB-LEB-9981',
        vehicle: 'Toyota Corolla',
        totalChallans: 5,
        unpaidChallans: 1,
        dueAmount: 2500,
        latestViolation: 'Speeding Violation',
        evidence: {
          camA: '09:14:00.000',
          camB: '09:14:54.545',
          averageSpeed: 132,
          speedLimit: 120,
          timeDiffSeconds: 54.545
        }
      });
    }
    res.json({
      driverName: driver.driverName,
      cnic: driver.cnic,
      plateNumber: driver.plateNumber,
      vehicle: driver.vehicle,
      totalChallans: driver.totalChallans,
      unpaidChallans: driver.unpaidChallans,
      dueAmount: driver.dueAmount,
      latestViolation: driver.latestViolation,
      evidence: driver.evidence
    });
  } catch (err) {
    console.error('Driver controller error:', err);
    res.status(500).json({ message: 'Unable to load driver evidence data.', error: err.message });
  }
}

async function createDriverRecord(req, res) {
  try {
    const body = req.body;
    const record = await DriverRecord.create(body);
    res.status(201).json(record);
  } catch (err) {
    console.error('Driver create error:', err);
    res.status(500).json({ message: 'Unable to create driver record.', error: err.message });
  }
}

async function listDriverRecords(req, res) {
  try {
    const records = await DriverRecord.find().sort({ createdAt: -1 }).limit(20);
    res.json(records);
  } catch (err) {
    console.error('Driver list error:', err);
    res.status(500).json({ message: 'Unable to load driver records.', error: err.message });
  }
}

module.exports = { getDriverEvidence, createDriverRecord, listDriverRecords };
