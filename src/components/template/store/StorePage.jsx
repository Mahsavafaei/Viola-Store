"use client";
import { CartContext } from "@/context/CartContext";
import { productQuantity } from "@/helpers/helper";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsCaretLeftFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { LuSearch, LuUserRound } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { TbShoppingBagCheck } from "react-icons/tb";

function StorePage({ products }) {
  const { state, dispatch } = useContext(CartContext);
  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState();

  const data = products.products;
 

  // گرفتن آی‌دی‌های محصولات
  const uniId = data.map((product) => product._id);

  // مقدار کمیت هر محصول بر اساس آی‌دی‌ها
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

  //search
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
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-lightColor/60 pb-10">
      <h1 className="mt-4 text-2xl font-black text-darkColor">محصولات</h1>
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
          نتایج جست‌‌و‌جو برای عبارت"{searchValue}"
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
                      {product.productPrice}{" "}
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
          data.map((product, index) => (
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
                    {product.productPrice}{" "}
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
            <Link href={"/store"} onClick={inputRefHandler}>
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

export default StorePage;
