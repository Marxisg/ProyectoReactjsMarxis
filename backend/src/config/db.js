import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Base de datos MongoDB conectada");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
