"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";
import { productQuantity, separator } from "@/helpers/helper";
import Accordion from "../modules/Accordion";

import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { LuBookCheck, LuSearch, LuUserRound } from "react-icons/lu";
import { TbShoppingBagCheck } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiTimerFlashLine } from "react-icons/ri";
import { BsCaretLeftFill } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineMoreHoriz } from "react-icons/md";
import SwiperComponent from "../modules/Swiper";




function HomePage({ products }) {
  const { state, dispatch } = useContext(CartContext);
  const [data, setData] = useState(products.products);
  const limitedProducts = data.slice(0, 10);

  const uniId = data.map((product) => product._id);

  const quantities = uniId.map((id) => productQuantity(state, id));

  //Save cartData to localStorage =>
  // Retrieve cart data from localStorage when the component loads
  useEffect(() => {
    const savedCart = localStorage.getItem("cartData");
    if (savedCart) {
      dispatch({ type: "SET_CART", payload: JSON.parse(savedCart) });
    }
  }, [dispatch]);
  // Save updated cart state to localStorage
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(state));
  }, [state]);

  const clickHandler = (e, type, product) => {
    e.preventDefault();
    dispatch({ type, payload: product });
  };

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
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-lightColor/60">
     <SwiperComponent/>
      {/* SearchBar */}
      <div className="relative my-8 w-3/4">
        <input
          placeholder="جست‌‌و‌جو در کتاب‌‌ها ..."
          className="input w-full rounded-2xl border-darkColor py-3 pl-5 pr-8 text-sm shadow-lg outline-none focus:border-2"
          name="search"
          type="search"
          ref={inputRef}
          onChange={searchProductHandler}
        />

        <LuSearch className="absolute right-3 top-3 text-gray-500" />
      </div>
      {searchValue && (
        <p className="my-7 text-center text-sm font-bold">
          نتایج جست‌‌و‌جو برای عبارت`&ldquo;`{searchValue}`&ldquo;`
        </p>
      )}

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
                      {separator(product.productPrice)}
                      <span className="text-[10px] text-gray-500">تومان</span>{" "}
                    </span>
                  </div>
                  {/* eleman */}

                  <div className="flex w-full items-center justify-between">
                    <button
                      onClick={clickHandler}
                      className="cursor-pointer rounded-lg bg-darkColor p-1 text-white"
                    >
                      <TbShoppingBagCheck />
                    </button>
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
            <div className="mx-auto my-14 text-lg">
              کتابی با این مشخصات یافت نشد!
            </div>
          )
        ) : (
          /* Card product */
          limitedProducts.map((product, index) => (
            // const quantity = quantities[index]
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
                    {separator(product.productPrice)}{" "}
                    <span className="text-[10px] text-gray-500">تومان</span>{" "}
                  </span>
                </div>
                {/* eleman */}

                <div className="flex w-full items-center justify-between">
                  {/* show btns */}
                  {quantities[index] === 0 ? (
                    <button
                      onClick={(e) => clickHandler(e, "ADD_ITEM", product)}
                      className="cursor-pointer rounded-lg bg-darkColor p-1 text-white"
                    >
                      <TbShoppingBagCheck />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => clickHandler(e, "INCREASE", product)}
                      className="h-6 w-6 cursor-pointer rounded-lg bg-darkColor leading-6 text-white"
                    >
                      +
                    </button>
                  )}
                  {quantities[index] >= 1 && <span>{quantities[index]}</span>}
                  {quantities[index] === 1 && (
                    <button
                      onClick={(e) => clickHandler(e, "REMOVE_ITEM", product)}
                      className="cursor-pointer rounded-lg bg-darkColor p-1 text-white"
                    >
                      <MdDeleteOutline />
                    </button>
                  )}

                  {quantities[index] > 1 && (
                    <button
                      onClick={(e) => clickHandler(e, "DECREASE", product)}
                      className="h-6 w-6 cursor-pointer rounded-lg bg-darkColor leading-6 text-white"
                    >
                      -
                    </button>
                  )}

                  <Link
                    href={"/store/productDetails/" + product._id}
                    className="flex items-center text-darkColor"
                  >
                    <span className="text-xs">جزئیات</span> <BsCaretLeftFill />{" "}
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* btn more */}
      <Link
        href={"/store"}
        className="group my-8 flex max-w-fit cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-b from-darkColor to-darkColor/55 px-6 py-3 font-medium text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      >
        <div className="relative overflow-hidden max-sm:text-xs">
          <p className="duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">
            مشاهده بیش‌تر
          </p>
          <p className="absolute left-8 top-5 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0 max-sm:left-7 max-sm:top-4">
            <MdOutlineMoreHoriz className="text-4xl max-sm:text-xl" />
          </p>
        </div>
      </Link>

      {/* Accordion */}
      <h3 className="mt-10 text-2xl font-black text-darkColor">
        سوالات متداول
      </h3>
      <div className="mt-5 w-3/4 rounded-2xl bg-white p-4 shadow-xl">
        <Accordion
          title=" چرا باید کتاب‌های مختلف رو بخونم؟"
          answer=" هر کتاب دنیایی جدید و هیجان‌انگیز رو برات باز می‌کنه، تجربیات تازه می‌سازه و دیدت رو گسترش میده. با هر صفحه، بخش جدیدی از خودت رو کشف می‌کنی."
        />
        <Accordion
          title="چطور می‌تونم کتاب مناسب رو پیدا کنم؟"
          answer="ما بهترین‌ها رو جمع‌آوری کردیم! فقط کافی‌یه نوع علاقه‌ت رو انتخاب کنی یا بر اساس پیشنهادهای ما، کتابی رو برگزینی که دلت می‌طلبه. سفر به دنیای کتاب‌ها منتظرته!

"
        />
        <Accordion
          title="آیا خرید کتاب‌های آنلاین امن است؟"
          answer=" صددرصد! با روش‌های امن و مطمئن، کتاب‌ها به درب منزلت می‌رسن، و تو فقط باید لذت مطالعه رو تجربه کنی. راحت و بی‌دغدغه، دنیای کتاب‌ها رو به خانه‌ات بیار!

"
        />
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
            <Link href={"/checkout"}>
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
