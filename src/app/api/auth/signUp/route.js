import { NextResponse } from "next/server";
import User from "../../../../models/User";
import { hashPassword } from "../../../../utils/auth";
import connectDB from "../../../../utils/connectDB";

export async function POST(req) {
  try {
    await connectDB();

    //checking req of frontend
    const data = await req.json();
    const { name, lastName, email, phone, pass, gender , role , enabled , image} = data;

    //validation
    if (!name || !lastName || !email || !phone || !pass || !gender || !role || !enabled ) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید!" },
        { status: 422 }
      );
    }
    //validation regex

    //validation exist
    const existingEmail = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone });
    if (existingEmail) {
      return NextResponse.json(
        { error: "حساب کاربری با ایمیل یا شماره‌تلفن وجود دارد!" },
        { status: 422 }
      );
    }
    if (existingPhone) {
      return NextResponse.json(
        { error: "حساب کاربری با ایمیل یا شماره‌تلفن وجود دارد!" },
        { status: 422 }
      );
    }
    //if you want, ok more validation...

    //hash password
    const hashedPassword = await hashPassword(pass);

    //now create user
    const newUser = await User.create({
      role,
      enabled,
      name,
      lastName,
      email,
      phone,
      pass: hashedPassword,
      gender,
      image
    });

    console.log(pass)

    return NextResponse.json(
      { message: "کاربر جدید با موفقیت افزوده شد." },
      { status: 201 }
      
    );
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است!" },
      { status: 500 }
    );
  }
}
