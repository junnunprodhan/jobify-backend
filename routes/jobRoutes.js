import express from 'express';
import Job from '../models/Job.js';
import { generateJobDescription } from '../services/aiService.js';

const router = express.Router();

// Create a job
router.post('/', async (req, res) => {
  const { title, company, location } = req.body;
  let { description } = req.body;

  if (!description) {
    description = await generateJobDescription(title, company); // AI integration
  }

  const newJob = new Job({ title, company, location, description });
  await newJob.save();
  res.json(newJob);
});

// Get all jobs (pagination)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const jobs = await Job.find().skip((page - 1) * limit).limit(limit);
  res.json(jobs);
});

export default router;
