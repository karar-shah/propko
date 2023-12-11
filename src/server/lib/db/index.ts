import mongoose, { Types } from "mongoose";
import User, {
  createUser,
  getUserByEmail,
  getUserByEmailWPwd,
  getUserById,
} from "./schemas/users";
import Property from "./schemas/properties";
declare global {
  var mongoose: any;
}

const db = {
  User: {
    updateOne: User.updateOne,
    findOne: User.findOne,
    getUserByEmail,
    getUserById,
    createUser,
    getUserByEmailWPwd,
  },
  Property: Property,
};

const MONGODB_URI = process.env.DATABASE_URL as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongoose() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: true,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

type WithMongoose = <TFunc extends Function>(callback: TFunc) => TFunc;

const withMongoose: WithMongoose = (callback) => {
  connectMongoose();
  return callback;
};

const validateMongooseObject = <
  TObj extends Record<string, any> & { _id: Types.ObjectId }
>(
  obj: TObj
) => {
  return {
    ...obj,
    _id: obj._id.toString(),
  };
};

export { db, connectMongoose, validateMongooseObject };
export default withMongoose;
