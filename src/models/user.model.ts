import  { Schema, Model, Document } from 'mongoose';
import * as mongoose from 'mongoose';
type UserDocument = Document & {
  fullName: string;
  email: string;
  password: string;
  enabled: string;
  dob:Date
  role: string;
};

type UserInput = {
  fullName: UserDocument['fullName'];
  email: UserDocument['email'];
  password: UserDocument['password'];
  dob: UserDocument['dob'];
  role: UserDocument['role'];
};

const usersSchema = new Schema(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      required: true,
    },
    dob: {
      type: Schema.Types.Date,
      required: true,
    },
    
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);

export { User, UserInput, UserDocument };