"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { S3 } from "aws-sdk";
import Loader from "../modules/Loader";
import { NextResponse } from "next/server";
import toast, { Toaster } from "react-hot-toast";

function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    pass: "",
    confirmPass: "",
    gender: "",
    image: "",
  });

  const formChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setForm({ ...form, [name]: value });
  };
  const fileHandler = (event) => {
    setForm({ ...form, image: event.target.files[0] });
    console.log(event.target.files[0]);
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    //VALIDATION
    let imageUrl = "";

    if (form.image !== "") {
      try {
        //Authorization
        const ACCESS_KEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
        const SECRET_KEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
        const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
        const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

        //Initialize S3 client
        const s3 = new S3({
          endpoint: ENDPOINT,
          accessKeyId: ACCESS_KEY,
          secretAccessKey: SECRET_KEY,
        });

        const params = {
          //name of th project
          Bucket: BUCKET,
          //name of the file as a key
          Key: form.image.name,
          // file itself
          Body: form.image,
        };
        // Upload file to S3
        const res = await s3.upload(params).promise();

        //Generate a permanent signed URL
        const permanentSignedUrl = s3.getSignedUrl("getObject", {
          Bucket: BUCKET,
          Key: form.image.name,
          Expires: 3153600000, //100years
        });

        imageUrl = permanentSignedUrl;
        console.log(imageUrl);
      } catch (error) {
        const errorHandel = error.message
        toast.error(`خطا: ${errorHandel}`);  

      }
    }

    //signUp call (api)
    const res = await fetch("/api/auth/signUp", {
      method: "POST",
      body: JSON.stringify({
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        pass: form.pass,
        gender: form.gender,
        image: imageUrl,
      }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    console.log(form.pass);

    //Handel signIn & send user to next page

    const data = await res.json();
    if (res.status === 201) {
      signInHandler();
    } else {
      toast.error(".مشکلی پیش آمده؛ لطفا دوباره تلاش کنید");  
    }
  };

  const signInHandler = async () => {
    const res = await signIn("credentials", {
      email: form.email,
      pass: form.pass,
      redirect: false,
    });

    if (res.error) {
      toast.error("نتونستی وارد سایت بشی!");
    } else {
      toast.success("  ثبت‌نامت با موفقیت انجام شد!");
      router.push("/dashboard");
    }
  };

  return (
    <main>

      {/* alert */}
      <Toaster />

      <form className="mx-auto my-10 flex flex-col items-center justify-between gap-5 rounded bg-lightColor/60 px-3 py-6 max-md:w-1/2 md:w-96">
        <h1>فرم ثبت‌نام</h1>
        <input
          className="w-full rounded p-1"
          type="text"
          placeholder="نام"
          name="name"
          onChange={formChangeHandler}
        />
        <input
          className="w-full rounded p-1"
          type="text"
          placeholder="نام خانوادگی"
          name="lastName"
          onChange={formChangeHandler}
        />
        <input
          className="w-full rounded p-1"
          type="email"
          placeholder="ایمیل"
          name="email"
          onChange={formChangeHandler}
        />
        <input
          className="w-full rounded p-1"
          type="number"
          placeholder="تلفن همراه"
          name="phone"
          onChange={formChangeHandler}
        />
        <input
          className="w-full rounded p-1"
          type="password"
          placeholder="رمز عبور"
          name="pass"
          onChange={formChangeHandler}
        />
        <input
          className="w-full rounded p-1"
          type="password"
          placeholder="تکرار رمز عبور"
          name="confirmPass"
          onChange={formChangeHandler}
        />
        {/* <input type="file" name="image" onChange={fileHandler} /> */}


       {/* select an image */}
       <div className="flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-300  dark:hover:border-gray-400 "
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5 text-center">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  برای بارگذاری تصویر کلیک کنید
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                یا تصویر را اینجا رها کنید
              </p>
            </div>
            <input
              name="image"
              id="dropzone-file"
              type="file"
              onChange={fileHandler}
              className="hidden"
            />
               
          </label>
        </div>


        <select name="gender" value={"جنسیت"} onChange={formChangeHandler}>
          <option disabled>جنسیت</option>
          <option value="MAIL">آقا</option>
          <option value="FEMAIL">خانم</option>
        </select>

        <button onClick={signUpHandler}>
          {loading ? <Loader /> : <p>ثبت نام</p>}
          {/* ثبت نام */}
        </button>
      </form>
    </main>
  );
}

export default SignUpPage;
