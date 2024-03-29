import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username already exists'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: [true, 'email already exists'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
    verifyToken: {
      type: String,
    },
    verifyTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model.users || mongoose.model('users', userSchema);

export default User;
