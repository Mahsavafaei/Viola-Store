"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { S3 } from "aws-sdk";
import toast, { Toaster } from "react-hot-toast"
import BackBtn from "@/components/modules/buttons/BackBtn";
import Loader from "@/components/modules/Loader";

function DashboardEditUserPage({ user }) {
  const router = useRouter();

  const [form, setForm] = useState({
    role: user.role,
    enabled: user.enabled,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    pass: user.pass,
    confirmPass: user.confirmPass,
    gender: user.gender,
    image: user.image,
  });
  const [isLoading, setIsLoading] = useState(false);

  const formChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setForm({ ...form, [name]: value });
  };

  const fileHandler = (event) => {
    setForm({ ...form, image: event.target.files[0] });
    // console.log(event.target.files[0]);
  };

  const editUserHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
      } catch (error) {
        return toast.error(error.message);
      }
    }

    //signUp call (api)
    const res = await fetch("/api/users", {
      method: "PATCH",
      body: JSON.stringify({
        // know which user wants edit
        userId: user._id,
        enabled: form.enabled,
        role: form.role,
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

    const data = await res.json();
    // console.log(form.pass);

    if (res.status === 201) {
      toast.success("کاربر با موفقیت ویرایش شد");

      setIsLoading(false);
      router.refresh();
    } else {
      toast.error(data.error);
    }
  };
  return (
    <main>
      {/* alert */}
      <Toaster/>
      {/* <button><Link href='/'>بازگشت </Link></button> */}
      <BackBtn href={`/dashboard/users`} />
      <form className="mx-auto my-10 flex flex-col items-center justify-between gap-5 rounded bg-lightColor/60 px-3 py-6 max-md:w-1/2 md:w-96">
        <h1>ویرایش کاربر {user.name + " " + user.lastName}</h1>
        <select
          name="role"
          value={form.role}
          onChange={formChangeHandler}
          className="max-w-full"
        >
          <option disabled>نقش کاربر</option>
          <option value="ADMIN">مدیر سایت</option>
          <option value="USER">کاربر عادی</option>
        </select>
        <select
          className="max-w-full"
          name="enabled"
          value={form.enabled}
          onChange={formChangeHandler}
        >
          <option disabled>وضعیت کاربر</option>
          <option value="true">فعال</option>
          <option value="false">غیرفعال</option>
        </select>
        <input
          className="w-full rounded p-1"
          type="text"
          placeholder="نام"
          name="name"
          value={form.name}
          onChange={formChangeHandler}
        />
        <input
          className="w-full rounded p-1"
          type="text"
          placeholder="نام خانوادگی"
          name="lastName"
          value={form.lastName}
          onChange={formChangeHandler}
        />
        <input
          className="w-full rounded p-1"
          type="email"
          placeholder="ایمیل"
          name="email"
          value={form.email}
          onChange={formChangeHandler}
        />
        <input
          className="w-full rounded p-1"
          type="number"
          placeholder="تلفن همراه"
          name="phone"
          value={form.phone}
          onChange={formChangeHandler}
        />
        <input
          className="w-full rounded p-1"
          type="password"
          placeholder="رمز عبور"
          name="pass"
          value={form.pass}
          onChange={formChangeHandler}
        />
        <input
          className="w-full rounded p-1"
          type="password"
          placeholder="تکرار رمز عبور"
          name="confirmPass"
          value={form.confirmPass}
          onChange={formChangeHandler}
        />
        <input type="file" name="image" onChange={fileHandler} />
        <select
          className="max-w-full"
          name="gender"
          value={form.gender}
          onChange={formChangeHandler}
        >
          <option disabled>جنسیت</option>
          <option value="MAIL">آقا</option>
          <option value="FEMAIL">خانم</option>
        </select>

        <button onClick={editUserHandler}>
          {isLoading ? <Loader /> : <p>ویرایش</p>}
        </button>
      </form>
    </main>
  );
}

export default DashboardEditUserPage;
