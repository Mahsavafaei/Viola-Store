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
      { status: 500 },
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
      productDesc,
      productImage,
      productWriter,
      productLanguage,
      productShabak,
      productPageNum,
      productYear,
    } = await req.json();

    //validation
    if (
      !productName ||
      !productPrice ||
      !productSize ||
      !productDesc ||
      !productWriter ||
      !productLanguage ||
      !productShabak ||
      !productPageNum ||
      !productYear
    ) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید!" },
        { status: 400 },
      );
    }

    const newProduct = await Product.create({
      productName,
      productPrice,
      productSize,

      productDesc,
      productImage,
      productWriter,
      productLanguage,
      productShabak,
      productPageNum,
      productYear,
    });

    return NextResponse.json(
      { error: "محصول جدید اضافه شد." },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "لطفا اطلاعات معتبر وارد کنید!" },
      { status: 500 },
    );
  }
}

//edit 1 product

export async function PATCH(req) {
  try {
    await connectDB();
    const {
      productId,
      productName,
      productPrice,
      productSize,
      productDesc,
      productImage,
      productWriter,
      productLanguage,
      productShabak,
      productPageNum,
      productYear,
    } = await req.json();

    //validation
    // if (
    //   !productId ||
    //   !productName ||
    //   !productPrice ||
    //   !productSize ||
    //   !productDesc ||
    //   !productWriter ||
    //   !productLanguage ||
    //   !productShabak ||
    //   !productPageNum ||
    //   !productYear
    // ) {
    //   return NextResponse.json(
    //     { error: "لطفا اطلاعات معتبر وارد کنید!" },
    //     { status: 400 },
    //   );
    // }

    const product = await Product.findById(productId);
    console.log("product back end:", product);

    product.name = productName;
    product.price = productPrice;
    product.size = productSize;
    product.desc = productDesc;
    product.writer = productWriter;
    product.language = productLanguage;
    product.shabak = productShabak;
    product.pageNum = productPageNum;
    product.year = productYear;
    product.image = productImage;
    console.log("data:", product);

    //checking change information
    // if (product.name === productName) {
    //   return NextResponse.json(
    //     { error: "تغییری صورت نگرفته است!" },
    //     { status: 201 },
    //   );
    // }

    await product.save();

    return NextResponse.json({ error: "محصول ویرایش شد." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "لطفا اطلاعات معتبر وارد کنید!" },
      { status: 500 },
    );
  }
}
