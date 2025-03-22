"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { S3 } from "aws-sdk";
import Loader from "../modules/Loader";
import { NextResponse } from "next/server";

function SignUpPage() {
  const router = useRouter();

  const [loading , setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    pass: "",
    confirmPass: "",
    gender: "",
    image:""
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
    setLoading(true)

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
            console.log(imageUrl)
          } catch (error) {
            return alert(error.message);
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
          image: imageUrl
        }),
        headers: { "Content-Type": "application/json" },
        
      });

    setLoading(false)
    console.log(form.pass)

    //Handel signIn & send user to next page
  
    const data = await res.json();
    if (res.status === 201) {
      signInHandler();
    }

  };

  const signInHandler = async () => {
    const res = await signIn("credentials", {
      email: form.email,
      pass: form.pass,
      redirect: false,
    });

    if (res.error) {
      alert("نتونستی وارد سایت بشی!");
      
    } else {
      alert("  ثبت‌نامت با موفقیت انجام شد!");
      router.push("/dashboard");
    }
  };
 

  return (
    <main>
      <form className=" max-md:w-1/2 md:w-96  mx-auto my-10 flex flex-col items-center justify-between gap-5 bg-lightColor/60 rounded px-3 py-6">
        <h1>فرم ثبت‌نام</h1>
        <input
          className="rounded p-1 w-full"
          type="text"
          placeholder="نام"
          name="name"
          onChange={formChangeHandler}
        />
        <input
          className="rounded p-1 w-full"
          type="text"
          placeholder="نام خانوادگی"
          name="lastName"
          onChange={formChangeHandler}
        />
        <input
          className="rounded p-1 w-full"
          type="email"
          placeholder="ایمیل"
          name="email"
          onChange={formChangeHandler}
        />
        <input
          className="rounded p-1 w-full"
          type="number"
          placeholder="تلفن همراه"
          name="phone"
          onChange={formChangeHandler}
        />
        <input
          className="rounded p-1 w-full"
          type="password"
          placeholder="رمز عبور"
          name="pass"
          onChange={formChangeHandler}
        />
        <input
          className="rounded p-1 w-full"
          type="password"
          placeholder="تکرار رمز عبور"
          name="confirmPass"
          onChange={formChangeHandler}
        />
         <input type="file" name="image" onChange={fileHandler} />
        <select name="gender" value={'جنسیت'} onChange={formChangeHandler}>
          <option disabled  >
            جنسیت
          </option>
          <option value="MAIL">آقا</option>
          <option value="FEMAIL">خانم</option>
        </select>

        <button onClick={signUpHandler}>
          {loading ? <Loader/> :  <p>ثبت نام</p> }
          {/* ثبت نام */}
        </button>
      </form>
    </main>
  );
}

export default SignUpPage;
