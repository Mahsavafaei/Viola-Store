"use client";
import { useRef } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { LuSearch, LuUserRound } from "react-icons/lu";
import { TbListDetails, TbShoppingBagCheck } from "react-icons/tb";

import Image from "next/image";
import { BsCaretLeftFill } from "react-icons/bs";

function HomePage({ products }) {
  //search click
  const inputRef = useRef(null);
  const inputRefHandler = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const data = products.products;

  return (
    <main className="flex min-h-screen  w-full flex-col items-center justify-between bg-lightColor/60 pt-10">
      <div className="parent flex w-full flex-col items-center justify-start min-h-screen ">
        {/* SearchBar */}
        <div className="relative  w-3/4 mt-10 mb-5 md:mt-12">
          <input
            placeholder="جستجو در کتاب‌‌ها ..."
            className="input w-full rounded-2xl border-darkColor px-5 py-3 text-sm shadow-lg outline-none focus:border-2"
            name="search"
            type="search"
            ref={inputRef}
          />
          <LuSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
 
        {/* products */}
        <div className="flex w-3/4 flex-wrap items-center justify-between gap-5  max-md:justify-center">
          {/* Card product */}
          {data.map((product, index) => (
            <div
              className="flex w-64 flex-col items-center rounded-2xl gap-5  border-darkColor bg-white pt-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              key={index}
            >
              <Link href={"/"} className="overflow-hidden">
                {" "}
                <Image
                  width={100}
                  height={100}
                  src={product.productImage}
                  alt={product.productName}
                  className="object-cover h-[200px] w-full transition-all duration-500 ease-in-out hover:scale-125 hover:opacity-65"
                />
              </Link>

              <div className="flex w-full flex-col items-center gap-5 p-4">
                {/* eleman */}
                <div className="flex w-full flex-col items-start gap-1 text-sm">
                  <p className="font-bold text-darkColor  line-clamp-1 ">
                    {product.productName}
                  </p>
                  <span className="font-bold">
                    {product.productPrice}{" "}
                    <span className="text-[10px] text-gray-500">تومان</span>{" "}
                  </span>
                </div>
                {/* eleman */}

                <div className=" flex w-full items-center justify-between">
                  <span className="cursor-pointer rounded-lg bg-darkColor p-1 text-white">
                    <TbShoppingBagCheck />
                  </span>
                  <Link href={"/"} className="flex items-center text-darkColor">
                    <span className="text-xs">جزئیات</span> <BsCaretLeftFill />{" "}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* NavigationBar mobile */}
      <div className="fixed bottom-2 left-1/2 flex -translate-x-1/2 transform items-center justify-center rounded-2xl bg-darkColor p-4 text-white shadow-2xl max-lg:w-3/4 lg:hidden">
        <ul className="flex w-full justify-between gap-5 font-black max-[320px]:gap-1 sm:justify-around">
          <li>
            <Link href={"/"}>
              <FiShoppingCart />
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <LuUserRound />
            </Link>
          </li>
          <li>
            <Link href={"/"} onClick={inputRefHandler}>
              <LuSearch />
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <AiOutlineHome />
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default HomePage;
