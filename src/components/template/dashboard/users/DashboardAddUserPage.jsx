"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BackBtn from "@/components/modules/BackBtn";

function DashboardAddUserPage() {
 
  const router = useRouter();

  const [form, setForm] = useState({
    role: "",
    enabled: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    pass: "",
    confirmPass: "",
    gender: "",
  });

  const formChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setForm({ ...form, [name]: value });
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    //VALIDATION

    //signUp call (api)

    const res = await fetch("/api/auth/signUp", {
      method: "POST",
      body: JSON.stringify({
        enabled: form.enabled,
        role: form.role,
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        pass: form.pass,
        gender: form.gender,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    // console.log(form.pass);

    if (res.status === 201) {
      alert("کاربر با موفقیت افزوده شد");
      router.refresh();
    } else {
      alert(data.error);
    }
  };
  return (
    <main>
      {/* <button><Link href='/'>بازگشت </Link></button> */}
      <BackBtn href={`/dashboard/users`} />
      <form className="mx-auto my-10 flex flex-col items-center justify-between gap-5 rounded bg-lightColor/60 px-3 py-6 max-md:w-1/2 md:w-96">
        <h1>افزودن کاربر جدید</h1>
        <select name="role" onChange={formChangeHandler} className="max-w-full">
          <option value="" selected disabled>
            نقش کاربر
          </option>
          <option value="ADMIN">مدیر سایت</option>
          <option value="USER">کاربر عادی</option>
        </select>
        <select
          className="max-w-full"
          name="enabled"
          onChange={formChangeHandler}
        >
          <option value="" selected disabled>
            وضعیت کاربر
          </option>
          <option value="true">فعال</option>
          <option value="false">غیرفعال</option>
        </select>
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
        <select
          className="max-w-full"
          name="gender"
          onChange={formChangeHandler}
        >
          <option disabled selected>
            جنسیت
          </option>
          <option value="MAIL">آقا</option>
          <option value="FEMAIL">خانم</option>
        </select>

        <button onClick={signUpHandler}>افزودن</button>
      </form>
    </main>
  );
}

export default DashboardAddUserPage;
