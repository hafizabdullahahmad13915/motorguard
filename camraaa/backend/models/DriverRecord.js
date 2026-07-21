const mongoose = require('mongoose');

const driverRecordSchema = new mongoose.Schema({
  driverName: { type: String, required: true },
  cnic: { type: String, required: true },
  plateNumber: { type: String, required: true },
  vehicle: { type: String, required: true },
  totalChallans: { type: Number, default: 0 },
  unpaidChallans: { type: Number, default: 0 },
  dueAmount: { type: Number, default: 0 },
  latestViolation: { type: String, default: 'None' },
  evidence: {
    camA: { type: String, default: '' },
    camB: { type: String, default: '' },
    averageSpeed: { type: Number, default: 0 },
    speedLimit: { type: Number, default: 120 },
    timeDiffSeconds: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DriverRecord', driverRecordSchema);
