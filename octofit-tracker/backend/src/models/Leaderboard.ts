import { Schema, model } from 'mongoose';

interface ILeaderboard {
  userId: Schema.Types.ObjectId;
  totalPoints: number;
  activitiesCount: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    totalPoints: { type: Number, default: 0 },
    activitiesCount: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema);

export default Leaderboard;
