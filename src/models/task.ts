import { Document, Schema, Model, model } from "mongoose";

export interface ITask extends Document {
  userId: string;
  name: string;
  description?: string;
  status?: Array<string>;
  priority?: boolean;
  createdAt?: Date;
}

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: [String],
    enum: ["Pending", "Cancelled", "Inprogress", "Completed"],
    default: ["Pending"]
  },
  priority: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Task: Model<ITask> = model<ITask>("Task", taskSchema);
