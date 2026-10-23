import express from 'express';

// Models
import { Project } from '../models/Project.js';

// Middleware
import { validate } from '../middlewares/validate.js';

// Zod validation schemas
import {
  upsertProjectSchema,
  deleteProjectSchema,
  getProjectSchema,
} from '../validators/projectValidator.js';

const router = express.Router();

// Get project
router.get('/projects/:id', validate(getProjectSchema), async (req, res) => {
  const { id } = req.params;

  try {
    // Exclude MongoDB internal _id and __v fields
    const project = await Project.findOne({ id }).select('-_id -__v').lean();

    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
      });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return res.status(500).json({
      error: 'Failed to retrieve project',
      details: error.message,
    });
  }
});

// Upsert a project
router.put('/projects/:id', validate(upsertProjectSchema), async (req, res) => {
  const { id } = req.params;
  const projectData = req.body;

  // Ensure path parameter matches body payload ID
  if (id !== projectData.id) {
    return res.status(400).json({
      error: 'Project ID in URL does not match ID in body',
    });
  }

  try {
    const upsertedProject = await Project.findOneAndUpdate(
      { id },
      { $set: projectData },
      {
        returnDocument: 'after',
        upsert: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      message: 'Project synced successfully',
      projectId: upsertedProject.id,
    });
  } catch (error) {
    console.error(`Error syncing project ${id}:`, error);
    return res.status(500).json({
      error: 'Failed to sync project',
      details: error.message,
    });
  }
});

// Delete project with given id
router.delete(
  '/projects/:id',
  validate(deleteProjectSchema),
  async (req, res) => {
    const { id } = req.params;

    try {
      await Project.findOneAndDelete({ id });

      return res.status(200).json({
        message: 'Project deleted successfully from cloud',
        projectId: id,
      });
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      return res.status(500).json({
        error: 'Failed to delete project',
        details: error.message,
      });
    }
  },
);

export default router;
