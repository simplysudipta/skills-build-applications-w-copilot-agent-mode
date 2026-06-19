import { Schema, model } from 'mongoose';

interface IActivity {
  userId: Schema.Types.ObjectId;
  activityType: string;
  duration: number;
  distance?: number;
  calories?: number;
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    calories: { type: Number },
    date: { type: Date, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Activity = model<IActivity>('Activity', activitySchema);

export default Activity;
