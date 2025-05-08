import Link from "next/link"

function NoLogin() {
  return (
    <div className="flex justify-center  items-center w-full h-full bg-white/80  py-3  rounded-lg ">
      <div className="flex text-[18px] flex-col gap-y-6 items-center">
        <h2 className="text-sm"> لطفا وارد حساب کاربری خود شوید.</h2>
        <div className="min:w-full flex flex-nowrap items-center gap-x-2 rounded-md bg-lightColor px-2 py-1">
                <Link href={"/signin"}>ورود </Link>
                <span>|</span>
                <Link href={"/signup"}>ثبت‌نام</Link>
              </div>
      </div>
    </div>
  )
}

export default NoLogin