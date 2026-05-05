import mongoose from "mongoose"

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return

  console.log("Connecting DB...")
  await mongoose.connect(process.env.MONGODB_URI!)
  console.log("DB Connected ✅")
}