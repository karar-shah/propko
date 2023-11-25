import mongoose from "mongoose";
import { createId } from "@paralleldrive/cuid2";

export interface IUser {
  id: string;
  email: string;
  password: string;
  emailVerified: Boolean;
}

const UsersSchema = new mongoose.Schema<IUser>(
  {
    id: {
      type: String,
      index: {
        unique: true,
      },
      default: () => createId(),
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

let User: mongoose.Model<IUser> =
  mongoose.models.Users || mongoose.model<IUser>("Users", UsersSchema);

export default User;
