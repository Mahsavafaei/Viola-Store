//get 1

import Product from "@/models/Product";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

//update 1

//delete 1
export async function DELETE(req) {
  try {
    await connectDB()
    const id = context.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(id)
    return NextResponse.json(
        { message: "محصول حذف شد." },
        { status: 200 }
      );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است!" },
      { status: 500 }
    );
  }
}
