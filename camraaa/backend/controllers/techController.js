const TechRecord = require('../models/TechRecord');

async function getDiagnostics(req, res) {
  try {
    let record = await TechRecord.findOne().sort({ createdAt: -1 });
    if (!record) {
      record = await TechRecord.create({
        cameraId: 'CAM-08',
        status: 'OFFLINE',
        fps: 0,
        pingMs: 1200,
        lensStatus: 'Obstructed',
        networkLink: 'Down',
        storageUsage: '82%',
        lastOnlineAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      });
    }
    res.json({
      cameraId: record.cameraId,
      status: record.status,
      fps: record.fps,
      ping: `${record.pingMs}ms`,
      lensStatus: record.lensStatus,
      networkLink: record.networkLink,
      storageUsage: record.storageUsage,
      lastOnlineAt: record.lastOnlineAt,
      formattedLastOnline: record.lastOnlineAt.toISOString()
    });
  } catch (err) {
    console.error('Tech controller error:', err);
    res.status(500).json({ message: 'Unable to load diagnostic data.', error: err.message });
  }
}

async function createTechRecord(req, res) {
  try {
    const body = req.body;
    const record = await TechRecord.create(body);
    res.status(201).json(record);
  } catch (err) {
    console.error('Tech create error:', err);
    res.status(500).json({ message: 'Unable to create tech record.', error: err.message });
  }
}

async function listTechRecords(req, res) {
  try {
    const records = await TechRecord.find().sort({ createdAt: -1 }).limit(20);
    res.json(records);
  } catch (err) {
    console.error('Tech list error:', err);
    res.status(500).json({ message: 'Unable to load tech records.', error: err.message });
  }
}

module.exports = { getDiagnostics, createTechRecord, listTechRecords };
