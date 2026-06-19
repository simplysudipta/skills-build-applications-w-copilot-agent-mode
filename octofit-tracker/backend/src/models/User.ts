import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);

export default User;
