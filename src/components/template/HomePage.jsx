"use client";
import { useRef } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { LuSearch, LuUserRound } from "react-icons/lu";

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
    <main className="flex min-h-[100vh] w-full flex-col items-center justify-between bg-lightColor/60 pt-24">
      {/* <div className="">
        {data.map((product) => (
          <div>{product.productName}</div>
        ))}
      </div> */}

      {/* SearchBar */}
      <div className="relative w-3/4">
        <input
          placeholder="جستجو در کتاب‌‌ها ..."
          className="input w-full rounded-2xl border-darkColor px-5 py-3 text-sm shadow-lg outline-none focus:border-2"
          name="search"
          type="search"
          ref={inputRef}
        />
        <LuSearch className="absolute left-3 top-3 text-gray-500" />
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
