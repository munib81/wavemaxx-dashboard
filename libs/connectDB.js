import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URL);
    //console.log("connection.readyState", connection.readyState)

    if (connection.readyState == 1) {
      //console.log("Database Connected")
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectDB;
