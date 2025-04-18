import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/utils/connectDB";

//search products
export async function POST(req) {
    try {
      await connectDB();
  
      const { searchValue } = await req.json();
  
      // validation
      if (!searchValue) {
        return NextResponse.json(
          { error: "لطفا اطلاعات معتبر وارد کنید" },
          { status: 400 },
        );
      }
  
      // flag i = is not case sensitive in search
      const searchRegex = new RegExp(searchValue, "i");
  
      const products = await Product.find({
        $or:[
          { productName:{$regex : searchValue}},
          { productSize:{$regex : searchValue}},
          { productWriter:{$regex : searchValue}},
     
        ]
       
      });
  
      return NextResponse.json( products , { status: 201 });
  
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "مشکلی در سرور رخ داده است" },
        { status: 500 },
      );
    }
  }
  