const mongoose = require('mongoose');

const techRecordSchema = new mongoose.Schema({
  cameraId: { type: String, required: true },
  status: {
    type: String,
    enum: ['ONLINE', 'OFFLINE', 'DEGRADED', 'MAINTENANCE'],
    default: 'ONLINE'
  },
  fps: { type: Number, default: 30 },
  pingMs: { type: Number, default: 15 },
  lensStatus: { type: String, default: 'Clean' },
  networkLink: { type: String, default: 'Up' },
  storageUsage: { type: String, default: '76%' },
  lastOnlineAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TechRecord', techRecordSchema);
