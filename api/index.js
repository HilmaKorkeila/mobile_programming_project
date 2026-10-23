import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes
import syncRoutes from './routes/syncRoutes.js';

// Middleware
import { requestLogger } from './middlewares/requestLogger.js';

// Express app with cors and json enabled. Enable requestLogger middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/sync', syncRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
