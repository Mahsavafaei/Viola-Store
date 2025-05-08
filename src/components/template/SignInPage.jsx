"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "../modules/Loader";
import toast, { Toaster } from "react-hot-toast";

function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    pass: "",
  });

  // const notif = (e) => {
  //   e.preventDefault()

  // }

  const formChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setForm({ ...form, [name]: value });
  };

  const signInHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    //VALIDATION

    //Handel signIn & send user to next page
    const result = await signIn("credentials", {
      email: form.email,
      pass: form.pass,
      redirect: false,
    });

    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
    } else {
      toast.success("رفتی تو سایت!");
      // toast.success('Successfully toasted!')
      setIsLoading(false);
      router.push("/dashboard");
    }
  };

  return (
    <main className="max-h-screen">
      <Toaster />
      <form className="mx-auto mt-10 mb-36 flex flex-col items-center justify-between gap-5 rounded bg-lightColor/60 px-3 py-6 max-md:w-1/2 md:w-96">
        <h1>فرم ورود کاربر</h1>

        <input
          className="w-full rounded p-1"
          type="email"
          placeholder="ایمیل"
          name="email"
          onChange={formChangeHandler}
        />

        <input
          className="w-full rounded p-1"
          type="password"
          placeholder="رمز عبور"
          name="pass"
          onChange={formChangeHandler}
        />

        <button onClick={signInHandler}>
          {isLoading ? <Loader /> : <span>ورود</span>}
        </button>
      </form>
    </main>
  );
}

export default SignInPage;
