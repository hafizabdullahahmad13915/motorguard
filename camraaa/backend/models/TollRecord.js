const mongoose = require('mongoose');

const tollRecordSchema = new mongoose.Schema({
  plateNumber: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending_challan', 'paid', 'settled', 'compliant'],
    default: 'pending_challan'
  },
  speed: { type: Number, required: true },
  postedLimit: { type: Number, default: 120 },
  location: { type: String, required: true },
  cameraId: { type: String, default: 'CAM-01' },
  confidence: { type: Number, default: 98.6 },
  fineAmount: { type: Number, default: 2500 },
  violationType: { type: String, default: 'Speeding' },
  settled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TollRecord', tollRecordSchema);
