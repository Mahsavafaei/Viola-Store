import User from "@/models/User";
import { hashPassword } from "@/utils/auth";

import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

//return all users
export async function GET(req) {
  try {
    await connectDB();

    const users = await User.find();
    return NextResponse.json(
      {
        users,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 },
    );
  }
}

// edit one user api
export async function PATCH(req) {
  try {
    await connectDB();

    const data = await req.json();
    const {
      userId,
      enabled,
      role,
      name,
      lastName,
      email,
      phone,
      pass,
      gender,
      image,
    } = data;
    // console.log(data)

    //pass is not important, admin maybe does not to chang it!
    if (
      !userId ||
      !enabled ||
      !role ||
      !name ||
      !lastName ||
      !email ||
      !phone ||
      !gender
    ) {
      return NextResponse.json(
        { message: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 422 },
      );
    }

    const user = await User.findById(userId);

    user.name = name;
    user.lastName = lastName;
    user.enabled = enabled;
    user.role = role;
    user.gender = gender;
    user.image = image;

    //checking change information

    if (user.email !== email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return NextResponse.json(
          { error: "حساب کاربری یا شماره تلفن وجود دارد" },
          { status: 422 },
        );
      }
      user.email = email;
    }

    if (user.phone !== phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return NextResponse.json(
          { error: "حساب کاربری یا شماره تلفن وجود دارد" },
          { status: 422 },
        );
      }

      user.phone = phone;
    }

    //pass
    if (pass) {
      //validPassFunction before hash

      const hashedPassword = await hashPassword(pass);
      user.pass = hashedPassword;
    }

    await user.save();

    return NextResponse.json(
      { message: "کاربر با موفقیت ویرایش شد" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 },
    );
  }
}
