import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";



//delete one user
export async function DELETE(req, { params }) {
  
const {userId} = params
    try {
      await connectDB();
  
      const deleteUser = await User.findByIdAndDelete(userId);
  
      return NextResponse.json(
        { message: "محصول با موفقیت حذف شد" },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { error: "مشکلی در سرور رخ داده است" },
        { status: 500 },
      );
    }
  }
  