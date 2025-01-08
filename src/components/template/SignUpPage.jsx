"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
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
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        pass: form.pass,
        gender: form.gender,
      }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(form.pass)
    //Handel signIn & send user to next page
    const data = await res.json();

    const signInHandler = async () => {
      const result = await signIn("credentials", {
        email: form.email,
        pass: form.pass,
        redirect: false,
      });

      if (result.error) {
        alert("نتونستی وارد سایت بشی!");
      } else {
        alert("  ثبت‌نامت با موفقیت انجام شد!");
        router.push("/dashboard");
      }
    };
    if (res.status === 201) {
      signInHandler();
    }

    console.log("form:", form);
    console.log(data);
    // console.log(res.status)
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
        <select name="gender" onChange={formChangeHandler}>
          <option disabled selected>
            جنسیت
          </option>
          <option value="MAIL">آقا</option>
          <option value="FEMAIL">خانم</option>
        </select>

        <button onClick={signUpHandler}>ثبت نام</button>
      </form>
    </main>
  );
}

export default SignUpPage;
