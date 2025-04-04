import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

//update 1
//get 1

//delete 1
export async function DELETE(req, { params }) {
  const { productId } = params;

  try {
    await connectDB();

    const deletedProduct = await Product.findByIdAndDelete(productId);

    return NextResponse.json({ message: "محصول حذف شد." }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است!" },
      { status: 500 },
    );
  }
}
