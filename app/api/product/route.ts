import { connectDB } from "@/lib/mongodb"
import Product from "../../../models/Product"

export async function GET() {
  try {
    await connectDB()
    const products = await Product.find()

    return Response.json(products)
  } catch (error) {
    console.log("ERROR:", error)   // 👈 ADD THIS
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}