import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';  // Add .js extension
import jobRoutes from './routes/jobRoutes.js';  // Add .js extension
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config();
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', authMiddleware, jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));