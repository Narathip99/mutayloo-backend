import mongoose from "mongoose";
import pc from "picocolors";

const connectDB = async () => {
  try {
    if (process.env.MONGO_URI !== undefined) {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        autoIndex: true,
      });

      console.log(
        pc.green(
          `Success: MongoDB Connected: ${conn.connection.host}:${conn.connection.port} - [${conn.connection.name}]`
        )
      );
    }
  } catch (error: any) {
    console.error(pc.red(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
