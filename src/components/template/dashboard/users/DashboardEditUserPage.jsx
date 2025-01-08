"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BackBtn from "@/components/modules/BackBtn";

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
  });

  const formChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setForm({ ...form, [name]: value });
  };

  const editUserHandler = async (event) => {
    event.preventDefault();
    //VALIDATION

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
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    // console.log(form.pass);

    if (res.status === 201) {
      alert("کاربر با موفقیت ویرایش شد");
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
        <h1>ویرایش کاربر {user.name + ' ' + user.lastName}</h1>
        <select name="role" value={form.role} onChange={formChangeHandler} className="max-w-full">
          <option  selected disabled>
            نقش کاربر
          </option>
          <option value="ADMIN">مدیر سایت</option>
          <option value="USER">کاربر عادی</option>
        </select>
        <select
          className="max-w-full"
          name="enabled"
          value={form.enabled}
          onChange={formChangeHandler}
        >
          <option  selected disabled>
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
        <select
          className="max-w-full"
          name="gender"
          value={form.gender}
          onChange={formChangeHandler}
        >
          <option disabled selected>
            جنسیت
          </option>
          <option value="MAIL">آقا</option>
          <option value="FEMAIL">خانم</option>
        </select>

        <button onClick={editUserHandler}>ویرایش</button>
      </form>
    </main>
  );
}

export default DashboardEditUserPage;
