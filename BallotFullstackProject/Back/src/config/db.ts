import mongoose from "mongoose";
import candidateModel from "../models/candidateModel";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    await seedDB();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

async function seedDB() {
  if (candidateModel.length === 0)
    await candidateModel.create(
      { name: "Bibi netanyahu" },
      { name: "Donald turmp" },
      { name: "Joh Biden" },
      { name: "Putzi motzi" }
    );
}
