"use client"
import Link from "next/link"
import { IoMdArrowRoundBack } from "react-icons/io"

function BackBtn({href}) {
  return (
   <Link  className="flex items-center gap-2 bg-slate-500  max-w-fit ml-auto" href={href}><span className="w-full">بازگشت</span><IoMdArrowRoundBack /></Link>
  )
}

export default BackBtn