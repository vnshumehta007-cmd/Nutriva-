import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from root .env or local .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

import servicesRoutes from './routes/services.js';
import nutritionistsRoutes from './routes/nutritionists.js';
import consultationsRoutes from './routes/consultations.js';
import calculatorRoutes from './routes/calculator.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', process.env.CLIENT_URL].filter(Boolean),
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'NUTRIVA Backend API',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/services', servicesRoutes);
app.use('/api/nutritionists', nutritionistsRoutes);
app.use('/api/consultations', consultationsRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/auth', authRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🌿 NUTRIVA API Server running on port ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
