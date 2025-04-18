"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { LuBookCheck, LuSearch, LuUserRound } from "react-icons/lu";
import { TbListDetails, TbShoppingBagCheck } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiTimerFlashLine } from "react-icons/ri";
import Image from "next/image";
import { BsCaretLeftFill } from "react-icons/bs";

function HomePage({ products }) {
  const [data, setData] = useState(products.products);

  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState();

  //search click
  const inputRef = useRef(null);
  const inputRefHandler = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const searchProductHandler = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue) {
      const search = async () => {
        const res = await fetch("/api/search/store", {
          method: "POST",
          body: JSON.stringify({
            searchValue,
          }),
        });

        if (res.status === 201) {
          const searchData = await res.json();
          setSearchResult(searchData);
    
        }
      };
      search();
    }
  }, [searchValue]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-lightColor/60 pt-10">
      <div className="parent flex min-h-screen w-full flex-col items-center justify-start">
        {/* SearchBar */}
        <div className="relative mb-5 mt-10 w-3/4 md:mt-12">
          <input
            placeholder="جست‌‌و‌جو در کتاب‌‌ها ..."
            className="input w-full rounded-2xl border-darkColor pl-5 pr-8 py-3 text-sm shadow-lg outline-none focus:border-2"
            name="search"
            type="search"
            ref={inputRef}
            onChange={searchProductHandler}
          />
          <LuSearch className="absolute  right-3 top-3 text-gray-500" />
        </div>
        {searchValue && <p className="text-center text-sm font-bold my-7">نتایج جست‌‌و‌جو برای عبارت"{searchValue}"</p>}
        {/* products */}
        <div className="flex w-3/4 flex-wrap items-center justify-between gap-5 max-md:justify-center">

          {searchValue ? (
            searchResult && searchResult.length >= 1 ? (
              searchResult.map((product, index) => (
                <div
                  className="flex w-64 flex-col items-center gap-5 rounded-2xl border-darkColor bg-white pt-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  key={index}
                >
                  <Link
                    href={"/store/productDetails/" + product._id}
                    className="overflow-hidden"
                  >
                    {" "}
                    <Image
                      width={100}
                      height={100}
                      src={product.productImage}
                      alt={product.productName}
                      className="h-[200px] w-full object-cover transition-all duration-500 ease-in-out hover:scale-125 hover:opacity-65"
                    />
                  </Link>

                  <div className="flex w-full flex-col items-center gap-5 p-4">
                    {/* eleman */}
                    <div className="flex w-full flex-col items-start gap-1 text-sm">
                      <p className="line-clamp-1 font-bold text-darkColor">
                        {product.productName}
                      </p>
                      <span className="font-bold">
                        {product.productPrice}{" "}
                        <span className="text-[10px] text-gray-500">تومان</span>{" "}
                      </span>
                    </div>
                    {/* eleman */}

                    <div className="flex w-full items-center justify-between">
                      <span className="cursor-pointer rounded-lg bg-darkColor p-1 text-white">
                        <TbShoppingBagCheck />
                      </span>
                      <Link
                        href={"/store/productDetails/" + product._id}
                        className="flex items-center text-darkColor"
                      >
                        <span className="text-xs">جزئیات</span>{" "}
                        <BsCaretLeftFill />{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="my-14 mx-auto text-lg">کتابی با این مشخصات یافت نشد!</div>
            )
          ) : (
            /* Card product */
            data.map((product, index) => (
              <div
                className="flex w-64 flex-col items-center gap-5 rounded-2xl border-darkColor bg-white pt-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                key={index}
              >
                <Link
                  href={"/store/productDetails/" + product._id}
                  className="overflow-hidden"
                >
                  {" "}
                  <Image
                    width={100}
                    height={100}
                    src={product.productImage}
                    alt={product.productName}
                    className="h-[200px] w-full object-cover transition-all duration-500 ease-in-out hover:scale-125 hover:opacity-65"
                  />
                </Link>

                <div className="flex w-full flex-col items-center gap-5 p-4">
                  {/* eleman */}
                  <div className="flex w-full flex-col items-start gap-1 text-sm">
                    <p className="line-clamp-1 font-bold text-darkColor">
                      {product.productName}
                    </p>
                    <span className="font-bold">
                      {product.productPrice}{" "}
                      <span className="text-[10px] text-gray-500">تومان</span>{" "}
                    </span>
                  </div>
                  {/* eleman */}

                  <div className="flex w-full items-center justify-between">
                    <span className="cursor-pointer rounded-lg bg-darkColor p-1 text-white">
                      <TbShoppingBagCheck />
                    </span>
                    <Link
                      href={"/store/productDetails/" + product._id}
                      className="flex items-center text-darkColor"
                    >
                      <span className="text-xs">جزئیات</span>{" "}
                      <BsCaretLeftFill />{" "}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* 4 parts */}

      <div className="my-16 grid w-3/4 grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
        <div className="w-full rounded-2xl bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-col items-center gap-5 p-3 text-center">
            <span className="rounded-2xl bg-lightColor/25 p-3 text-2xl text-darkColor/95">
              {" "}
              <LuBookCheck />
            </span>
            <p className="text-sm">ضمانت سلامت کتاب</p>
          </div>
        </div>

        <div className="w-full rounded-2xl bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-col items-center gap-5 p-3 text-center">
            <span className="rounded-2xl bg-lightColor/25 p-3 text-2xl text-darkColor/95">
              {" "}
              <LiaShippingFastSolid />
            </span>
            <p className="text-sm">ارسال بین‌المللی</p>
          </div>
        </div>

        <div className="w-full rounded-2xl bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-col items-center gap-5 p-3 text-center">
            <span className="rounded-2xl bg-lightColor/25 p-3 text-2xl text-darkColor/95">
              {" "}
              <RiTimerFlashLine />
            </span>
            <p className="text-sm"> تحویل سریع</p>
          </div>
        </div>
        <div className="w-full rounded-2xl bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-col items-center gap-5 p-3 text-center">
            <span className="rounded-2xl bg-lightColor/25 p-3 text-2xl text-darkColor/95">
              {" "}
              <BiSupport />
            </span>
            <p className="text-sm">پشتیبانی</p>
          </div>
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
            <Link href={"/dashboard"}>
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
