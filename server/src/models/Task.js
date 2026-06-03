import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.index({ createdAt: -1 });
taskSchema.index({ completed: 1 });
taskSchema.index({ order: 1 });

taskSchema.pre('save', async function () {
  if (this.isNew && this.order === 0) {
    const lastTask = await this.constructor
      .findOne()
      .sort({ order: -1 });

    this.order = lastTask ? lastTask.order + 1 : 0;
  }
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task;