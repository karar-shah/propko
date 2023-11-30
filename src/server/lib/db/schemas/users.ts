import mongoose from "mongoose";
import { createId } from "@paralleldrive/cuid2";
import { connectMongoose } from "..";
import { CreateUserParams, PublicUser } from "@/typing/auth";

export type AuthType = "google" | "credentials";

export type IUser = {
  id: string;
  email: string;
  emailVerified: Boolean;
  companyLogo?: string | null;
} & (
  | { authType: "google"; password?: string }
  | { authType: "credentials"; password: string }
);

const UsersSchema = new mongoose.Schema<IUser>(
  {
    id: {
      type: String,
      index: {
        unique: true,
      },
      default: () => createId(),
    },
    authType: {
      type: String,
      enum: ["google", "credentials"],
      default: "credentials",
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
      required: false,
      default: "",
    },
    companyLogo: {
      type: String,
      required: false,
      default: "",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    // _id: false,
  }
);

let User: mongoose.Model<IUser> =
  mongoose.models.Users || mongoose.model<IUser>("Users", UsersSchema);

export async function createUser(
  data: CreateUserParams
): Promise<PublicUser | undefined> {
  await connectMongoose();
  try {
    const user = await User.create({
      authType: data.authType,
      email: data.email,
      password: data.authType === "credentials" ? data.password : "",
    }).then((_user) => _user?.toObject());
    if (user) {
      return {
        authType: user.authType,
        email: user.email,
        emailVerified: user.emailVerified,
        id: user.id,
      };
    }
  } catch (error) {
    console.log("User Create Error ", error);
  }
  return undefined;
}
export async function getUserById(id: string): Promise<PublicUser | undefined> {
  await connectMongoose();
  const user = await User.findOne({
    id: id,
  }).then((_user) => _user?.toObject());
  if (user) {
    return {
      authType: user.authType,
      email: user.email,
      emailVerified: user.emailVerified,
      id: user.id,
    };
  }
  return undefined;
}
export async function getUserByEmail(
  email: string
): Promise<PublicUser | undefined> {
  await connectMongoose();
  const user = await User.findOne({
    email: email,
  }).then((_user) => _user?.toObject());
  if (user) {
    return {
      authType: user.authType,
      email: user.email,
      emailVerified: user.emailVerified,
      id: user.id,
    };
  }
  return undefined;
}
export async function getUserByEmailWPwd(
  email: string
): Promise<IUser | undefined> {
  await connectMongoose();
  const user = await User.findOne({
    email: email,
  }).then((_user) => _user?.toObject());
  if (user) {
    return user;
  }
  return undefined;
}

export default User;
