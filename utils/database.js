import mongoose from "mongoose";

let isConnected = false;

export const connectMongooseDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("dataBase is connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
