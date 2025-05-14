"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "../modules/buttons/LogoutBtn";
import { FaQuestion, FaShoppingCart, FaStore } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Logo } from "../../../public/index";
import { FaCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCall, IoMdHome } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BsFileTextFill } from "react-icons/bs";
import { CartContext } from "@/context/CartContext";

function NavBar() {
  const { data } = useSession();
  const {state:{itemsCounter} } = useContext(CartContext)

  const currentPage = usePathname();

  const [name, setName] = useState(""); //name
  const [auth, setAuth] = useState(""); //role
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    if (data) {
      setName(data?.user.name[0]);
      setAuth(data?.user.name[1]);
    }
  }, [data]);

  const showNavBar = () => {
    setOpen(!open);
  };
  return (
    <header
      className={
        currentPage.startsWith("/dashboard")
          ? "hidden"
          : "sticky top-0 z-50 block bg-white/95"
      }
    >
      {/* mobile */}
      <nav className="flex w-full items-center py-2 lg:hidden">
        {/* mobile hamburger*/}
        <div className="z-20">
          <button onClick={showNavBar} className="p-4 text-darkColor">
            {open ? <RxCross2 /> : <GiHamburgerMenu />}
          </button>
        </div>
        {/* Logo mobile*/}
        <div className="mx-auto">
          <Link href="/">
            {" "}
            <Image src={Logo} alt="viola" className="mx-auto w-12" />
          </Link>
        </div>

        {/* conditional icon & btnShop */}

        <div className="flex items-center gap-x-3 px-2">
          <Link href="/checkout" className="relative">
         {!!itemsCounter &&  <span className="text-white rounded-full px-1 text-[10px] bg-red-500 absolute -top-1 -right-1">{itemsCounter}</span>}
            <LuShoppingCart className="h-5 w-5" />
          </Link>

          {data ? (
            <div>
              <LogoutBtn />
            </div>
          ) : (
            <div className="text-xl text-darkColor">
              <Link href={"/signin"}>
                <FaCircleUser />{" "}
              </Link>
            </div>
          )}
        </div>

        {/* mobile sideBar*/}
        <div onClick={()=> setOpen(!open)} className={`bg-black/60 fixed top-0 right-0 h-screen w-screen ${open ? 'block' : 'hidden'}`}></div>
        <div
          className={`fixed h-full right-0 top-0 z-10 flex flex-col justify-between bg-white transition-all duration-300 ease-in-out lg:hidden ${open ? "w-60" : "w-0"}`}
        >
          {open && (
            <ul className="mt-20 flex flex-col justify-between gap-5 pr-3 font-black">
              <li>
                <Link className="flex items-center gap-2" href={"/"}>
                  {" "}
                  <span>
                    <IoMdHome />
                  </span>
                  خانه
                </Link>
              </li>
              <li>
                <Link className="flex items-center gap-2" href={"/store"}>
                  {" "}
                  <span>
                    <FaStore />
                  </span>
                  محصولات
                </Link>
              </li>
              <li>
                <Link className="flex items-center gap-2" href={"/checkout"}>
                  <span>
                    <FaShoppingCart />
                  </span>{" "}
                  سبد خرید
                </Link>
              </li>
              {/* <li>
                <Link className="flex items-center gap-2" Link href={"/"}>
                  <span>
                    <BsFileTextFill />
                  </span>
                  مقالات
                </Link>
              </li> */}
              <li>
                <Link className="flex items-center gap-2"  href={"/contactus"}>
                  <span>
                    <IoMdCall />
                  </span>
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link className="flex items-center gap-2" href={"/aboutus"}>
                  <span>
                    <FaQuestion />
                  </span>
                  درباره ما
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* tablet * desktop  */}
      <nav className="m-auto hidden w-full items-center gap-5 px-10 py-3 lg:flex">
        <div className="mx-auto flex w-[96%] max-w-[1490px] items-center justify-between">
          {/* Logo */}
          <Link href="/">
            {" "}
            <Image src={Logo} alt="viola" className="mx-auto w-12" />
          </Link>

          {/* List */}
          <ul className="mr-32 flex items-center justify-around gap-x-4 text-sm 2xl:text-base">
            <li>
              <Link href={"/"}>خانه</Link>
            </li>
            <li>
              <Link href={"/store"}>محصولات</Link>
            </li>
            <li>
              <Link href={"/checkout"}>سبد خرید</Link>
            </li>
            {/* <li>
              <Link href={"/"}>مقالات</Link>
            </li> */}
            <li>
              <Link href={"/contactus"}>تماس با ما</Link>
            </li>
            <li>
              <Link href={"/aboutus"}>درباره ما</Link>
            </li>
          </ul>

          {/* conditional icon & btnShop */}

          <div className="flex items-center gap-1">
        

            <Link href="/checkout" className="relative">
         {!!itemsCounter &&  <span className="text-white rounded-full px-1 text-[10px] bg-red-500 absolute -top-1 -right-1">{itemsCounter}</span>}
            <LuShoppingCart className="h-5 w-5" />
          </Link>

            {data ? (
              <div>
                <Link href="/dashboard">{name}</Link> عزیز خوش‌آمدید{" "}
                <LogoutBtn />
              </div>
            ) : (
              <div className="min:w-fit flex flex-nowrap items-center gap-x-2 rounded-md bg-lightColor px-2 py-1">
                <Link href={"/signin"}>ورود </Link>
                <span>|</span>
                <Link href={"/signup"}>ثبت‌نام</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
