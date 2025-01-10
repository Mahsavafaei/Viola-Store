import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

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

    const users = await User.find({
      $or:[
        { name:{$regex : searchValue}},
        { lastName:{$regex : searchValue}},
        { email:{$regex : searchValue}},
        { phone:{$regex : searchValue}},
      ]
     
    });

    return NextResponse.json( users , { status: 201 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 },
    );
  }
}
