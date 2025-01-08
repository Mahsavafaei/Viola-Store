"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignInPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    pass: "",
  });

  const formChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setForm({ ...form, [name]: value });
  };

  const signInHandler = async (event) => {
    event.preventDefault();
    //VALIDATION

    //Handel signIn & send user to next page
    const result = await signIn("credentials", {
      email: form.email,
      pass: form.pass,
      redirect: false,
    });

    if (result.error) {
      alert(result.error);
    } else {
      alert("رفتی تو سایت!");
      router.push("/dashboard");
    }

    console.log("form:", form);
 
  };
  return (
    <main className="h-screen">
      <form className=" max-md:w-1/2 md:w-96  mx-auto my-10 flex flex-col items-center justify-between gap-5 bg-lightColor/60 rounded px-3 py-6">
        <h1>فرم ورود کاربر</h1>

        <input
          className="rounded p-1 w-full"
          type="email"
          placeholder="ایمیل"
          name="email"
          onChange={formChangeHandler}
        />

        <input
          className="rounded p-1 w-full"
          type="password"
          placeholder="رمز عبور"
          name="pass"
          onChange={formChangeHandler}
        />

        <button onClick={signInHandler}>ورود</button>
      </form>
    </main>
  );
}

export default SignInPage;
