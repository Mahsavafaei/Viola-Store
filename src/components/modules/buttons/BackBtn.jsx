"use client";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

function BackBtn({ href }) {
  return (
    //  <Link  className="flex items-center gap-2 bg-slate-500  max-w-fit ml-auto" ><span className="w-full">بازگشت</span><IoMdArrowRoundBack /></Link>

    <Link
      href={href}
      className="group ml-auto flex max-w-fit cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-b from-darkColor to-darkColor/55 px-6 py-4 font-medium text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
      <div className="relative overflow-hidden max-sm:text-xs">
        <p className="duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">
          بازگشت
        </p>
        <p className="absolute left-4 top-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0 max-sm:left-2 max-sm:top-4">
          <IoMdArrowRoundBack className="text-xl" />
        </p>
      </div>
    </Link>
  );
}

export default BackBtn;
