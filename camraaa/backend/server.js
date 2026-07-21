const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- ROUTES MOUNT --- //
const tollRoutes = require('./routes/tollRoutes');
const driverRoutes = require('./routes/driverRoutes');
const techRoutes = require('./routes/techRoutes');

app.use('/api/toll', tollRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/tech', techRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('MotorGuard API Backend Running!');
});

function sanitizeMongoUri(uri) {
    return uri
        .replace(/([?&])(useNewUrlParser|useUnifiedTopology|retryWrites)=(?:true|false)(?=&|$)/gi, (match, sep) => sep === '?' ? '?' : '')
        .replace(/[?&]$/, '');
}

const rawMongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/motorguard';
const MONGO_URI = sanitizeMongoUri(rawMongoUri);
let dbConnected = false;
let mongoServer;

async function connectToMongo() {
    console.log('🔍 Attempting MongoDB connection to:', MONGO_URI);
    try {
        await mongoose.connect(MONGO_URI);
        dbConnected = true;
        console.log('🟢 MongoDB Connected Successfully!');
        return;
    } catch (err) {
        console.warn('🟠 MongoDB Connection Warning:', err.message || err);
        console.warn('⚠️ Local MongoDB unavailable; attempting in-memory MongoDB fallback.');
    }

    try {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        console.log('🔄 Starting MongoMemoryServer fallback at:', uri);
        await mongoose.connect(uri);
        dbConnected = true;
        console.log('🟢 Connected to MongoMemoryServer fallback.');
    } catch (fallbackErr) {
        console.error('🔴 MongoDB fallback failed:', fallbackErr);
        throw fallbackErr;
    }
}

async function startServer() {
    try {
        await connectToMongo();
    } catch (err) {
        console.error('🔴 Unable to establish any MongoDB connection; exiting.');
        process.exit(1);
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is live on http://localhost:${PORT}`);
        if (!dbConnected) {
            console.log('⚠️ Running in degraded mode: MongoDB not connected.');
        }
    });
}

startServer();