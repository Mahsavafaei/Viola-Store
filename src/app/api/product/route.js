import Product from "@/models/Product";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

//return all products
export async function GET(req) {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است!" },
      { status: 500 }
    );
  }
}

//create 1 product
export async function POST(req) {
  try {
    await connectDB();
    const {
      productName,
      productPrice,
      productSize,
      productMaterial,
      productDesc,
      productImage,
      productColor,
      productWeight,
      productBrand,
    } = await req.json();

    //validation
    if (!productName || !productPrice) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید!" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
        productName,
        productPrice,
        productSize,
        productMaterial,
        productDesc,
        productImage,
        productColor,
        productWeight,
        productBrand,
    })

    return NextResponse.json(
        { error: "محصول جدید اضافه شد." },
        { status: 201 }
      );


  } catch (error) {
    console.log(error)
    return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید!" },
        { status: 500 }
      );
  }
}
