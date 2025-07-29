import mongoose from "mongoose";

type connectionobject = {
  isconnected?: number;
};

const connection: connectionobject = {};

async function dbconnect(): Promise<void> {
  // check if we had done the connection before this or not  or its already connected
  if (connection.isconnected) {
    console.log("already connect ");
    return;
  }
  try {
    // try to connect to database
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isconnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("database connection falied : ", error);
    process.exit(1);
  }
}
export default dbconnect;
