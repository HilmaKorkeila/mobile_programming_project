import mongoose from 'mongoose';

// Expense
const expenseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    projectId: { type: String, required: true },
    name: { type: String, required: true, maxlength: 50 },
    amount: { type: Number, default: 0, required: true },
    createdAt: { type: Number, required: true },
  },
  { _id: false },
);

const taskSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    projectId: { type: String, required: true },
    name: { type: String, required: true, maxlength: 50 },
    createdAt: { type: Number, required: true },
    status: { type: String, default: 'Not complete', required: true },
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, maxlength: 50 },
  description: { type: String, default: '', maxlength: 200 },
  budget: { type: Number, default: 0, required: true },
  is_favourite: { type: Boolean, default: false, required: true },
  createdAt: { type: Number, required: true },
  // Embedded arrays for 1-to-many relations
  expenses: { type: [expenseSchema], default: [] },
  tasks: { type: [taskSchema], default: [] },
});

export const Project = mongoose.model('Project', projectSchema);
