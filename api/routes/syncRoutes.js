import express from 'express';

// Models
import { Project } from './models/Project.js';

const router = express.Router();

router.put('/projects/:id', async (req, res) => {
  console.log('Hello World!');
});
