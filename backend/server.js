/**
 * @file         server.js
 * @description  Entry point for Duo Designs backend API.
 *               Connects to MongoDB Atlas and starts the Express server.
 *
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

/**
 * @function startServer
 * @description Connects to MongoDB and starts Express listener.
 */
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`\n🚀 Duo Designs API running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 http://localhost:${PORT}/api`);
            console.log(`💚 Health: http://localhost:${PORT}/health`);
            if (process.env.CLIENT_URL) {
                console.log(`🌐 Client: ${process.env.CLIENT_URL}`);
            }
            if (process.env.ADMIN_URL) {
                console.log(`🔒 Admin:  ${process.env.ADMIN_URL}`);
            }
            console.log('');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

