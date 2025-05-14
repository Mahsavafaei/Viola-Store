"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "@/context/CartContext";
import {
  disCount,
  finalPrice,
  productQuantity,
  separator,
  tax,
} from "@/helpers/helper";
import { IoIosArrowDropdown } from "react-icons/io";
import { GiConfirmed, GiRaspberry } from "react-icons/gi";
import { GoChecklist } from "react-icons/go";

import {
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";
import NoLogin from "../../modules/NoLogin";

import { TbCreditCardPay, TbShoppingBagCheck } from "react-icons/tb";
import BasketDetails from "../../modules/BasketDetails";
import { useSession } from "next-auth/react";
import Loader from "../../modules/Loader";
import { FiShoppingCart } from "react-icons/fi";
import { LuSearch, LuShoppingCart, LuUserRound } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";

function CheckoutPage({ products }) {
  const { state, dispatch } = useContext(CartContext);
  const data = products.products;
  const { total } = state;
  const [isActive, setActive] = useState(false);
  const [alert, setAlert] = useState("");
  const [discount, setDiscount] = useState("");
  const [showSale, setShowSale] = useState("");
  const [toggle, setToggle] = useState("CONFIRM");
  
  const inputRef = useRef(null);

  const session = useSession();
  console.log("session", session);

  //  if(session.status === "unauthenticated"){
  //   setIsLogin(false)
  //  } else if(session.status === "authenticated"){
  //   setIsLogin(true)
  //  } else if(session.status === "loading"){
  //   return <div>در حال بارگذاری...</div>;

  //  }

  const sale = "qty";

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

  const submitHandler = () => {
    setAlert("");
    if (!discount) {
      setAlert(" کد وارد نشده است  ! ");
    } else if (discount === sale) {
      setToggle("EDIT");

      setShowSale(discount);
    } else if (discount !== sale) {
      setAlert(` کد نادرست است  ! `);
    }
  };

  const clickHandler = (type, product) => {
    dispatch({ type, payload: product });
  };

  const editHandler = (event) => {
    event.preventDefault();
    setToggle("CONFIRM_AGAIN");

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);

    setAlert("");
    setToggle("CONFIRM_AGAIN");
    setShowSale("");
  };

  const deleteHandler = () => {
    setDiscount("");
    setToggle("CONFIRM");
    setShowSale("");
  };

  const handleWidth = () => {
    setActive(!isActive);
  };

  const finalPrice1 = (number) => {
    return number - disCount(number) + tax(number);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F4F6F8] pb-10">
      <div className="flex w-[1150px] flex-row-reverse items-center justify-evenly gap-10 p-6 max-md:flex-col">
        {!state.itemsCounter ? (
          <p className="text-xl font-bold text-red-500">سبد خرید خالی است!</p>
        ) : (
          <>
            <div className="bg-lightBlue/20 top-[70px] flex h-fit w-full max-w-[410px] flex-col justify-between gap-6 self-center rounded-2xl p-3 shadow-xl max-md:mt-[40px] md:sticky md:w-[80%] md:self-start md:p-7">
              {/*payment top section:total +...  */}
              <div className="flex min-h-[200px] w-full flex-col gap-2 rounded-xl bg-white/80 p-4 shadow-[0px_3px_20px_4px_rgba(193,194,210,0.5)]">
                <div className="flex flex-row-reverse items-center justify-center gap-2">
                  <GoChecklist className="text-[27px]" />

                  <h2 className="text-[20px] font-black text-darkColor md:text-[24px]">
                    اطلاعات پرداخت
                  </h2>
                </div>
                <div className="mt-2 h-[2px] w-[90%] self-center bg-midColor/25"></div>
                <div className="flex h-full w-full flex-col justify-start gap-3 py-3">
                  <div className="flex flex-row-reverse justify-between text-[16px] font-bold text-black">
                    <h2 className="changeDir">جمع سبد خرید</h2>
                    <h2 className="changeDir">{separator(total)} تومان</h2>
                  </div>

                  {session.status === "authenticated" && (
                    <div
                      className={
                        isActive
                          ? "flex h-full w-full flex-col items-center justify-between gap-3 overflow-hidden p-[2px] ease-linear"
                          : "flex h-[27px] w-full flex-col justify-between gap-3 overflow-hidden p-[2px]"
                      }
                    >
                      <div className="flex w-full flex-row-reverse justify-between">
                        <h2 className="font-bold text-zinc-700">
                          {" "}
                          کد تخفیف دارید؟
                        </h2>
                        <button onClick={handleWidth} id="discountCode">
                          <IoIosArrowDropdown className="text-[22px]" />
                        </button>
                      </div>
                      <div className="flex w-full gap-2">
                        {toggle === "CONFIRM" && (
                          <button
                            onClick={submitHandler}
                            className="hover:bg-darkBlue rounded-md border border-[#0a5273] px-3 py-1 text-[20px] font-semibold text-[#0a5273] transition-all ease-linear hover:text-white"
                          >
                            <GiConfirmed />
                          </button>
                        )}

                        {(toggle === "EDIT" || toggle === "CONFIRM_AGAIN") && (
                          <button
                            onClick={deleteHandler}
                            className="rounded-md border border-[#0a5273] px-3 py-1 text-[20px] font-semibold text-[#0a5273] transition-all ease-linear hover:border-[#ef4444] hover:bg-red-500 hover:text-white"
                          >
                            <MdOutlineDelete />
                          </button>
                        )}
                        {toggle === "EDIT" && (
                          <button
                            onClick={editHandler}
                            className="rounded-md border border-[#0a5273] px-3 py-1 text-[20px] font-semibold text-[#0a5273] transition-all ease-linear hover:border-[#fcd34d] hover:bg-[#fcd34d] hover:text-white"
                          >
                            <MdOutlineEdit />
                          </button>
                        )}

                        {toggle === "CONFIRM_AGAIN" && (
                          <button
                            onClick={submitHandler}
                            className="hover:bg-darkBlue rounded-md border border-[#0a5273] px-3 py-1 text-[20px] font-semibold text-[#0a5273] transition-all ease-linear hover:border-[#16a34a] hover:bg-green-600 hover:text-white"
                          >
                            <MdOutlinePublishedWithChanges />
                          </button>
                        )}

                        <input
                          type="text"
                          placeholder="اینجا وارد کنید"
                          className="h-full w-full rounded-md border-[2px] p-2 outline-none placeholder:text-right focus:border-[#0a5273]"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                          disabled={toggle === "EDIT"}
                          ref={inputRef}
                        />
                      </div>

                      {alert && (
                        <div className="rounded-md bg-red-500 px-3 py-1 text-[14px]">
                          <h2 className="changeDir w-full text-white">
                            {alert}
                          </h2>{" "}
                        </div>
                      )}
                    </div>
                  )}

                  {showSale && (
                    <div className="flex flex-row-reverse justify-between text-[16px] font-bold text-red-600">
                      <h2 className="changeDir w-full"> تخفیف</h2>
                      <h2 className="">{separator(disCount(total))}</h2>
                    </div>
                  )}

                  <div className="flex flex-row-reverse justify-between text-[16px] font-bold text-cyan-700">
                    <h2 className="changeDir">مالیات</h2>
                    <h2 className="changeDir">{separator(tax(total))} </h2>
                  </div>

                  {toggle === "CONFIRM" && (
                    <div className="flex flex-row-reverse justify-between text-[18px] font-bold text-green-600">
                      <h2 className="changeDir">مبلغ نهایی</h2>
                      <h2 className="changeDir">
                        {separator(finalPrice(total))} تومان
                      </h2>
                    </div>
                  )}
                  {toggle === "CONFIRM_AGAIN" && (
                    <div className="flex flex-row-reverse justify-between text-[18px] font-bold text-green-600">
                      <h2 className="changeDir">مبلغ نهایی</h2>
                      <h2 className="changeDir">
                        {separator(finalPrice(total))} تومان
                      </h2>
                    </div>
                  )}
                  {toggle === "EDIT" && (
                    <div className="flex flex-row-reverse justify-between text-[18px] font-bold text-darkColor">
                      <h2 className="changeDir">مبلغ نهایی</h2>
                      <h2 className="changeDir">
                        {separator(finalPrice1(total))} تومان
                      </h2>
                    </div>
                  )}
                </div>
                {/* payment button */}
                {session.status === "authenticated" && (
                  <div
                    onClick={() => clickHandler("CHECKOUT")}
                    className="group mt-10 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-darkColor to-darkColor/55 px-6 py-4 font-medium text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  >
                    <div className="relative overflow-hidden text-base">
                      <p className="duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">
                        پرداخت
                      </p>
                      <p className="absolute left-3 top-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0">
                        <TbCreditCardPay className="text-2xl" />
                      </p>
                    </div>
                  </div>
                )}
                {session.status === 'unauthenticated' &&   <NoLogin />}
                {session.status === 'loading' &&   <div><Loader/></div>}
              
              </div>
            </div>
            {/* details card  */}
            <div className="w-2/3">
              {state.selectedItems.map((product) => (
                <BasketDetails
                  data={product}
                  key={product._id}
                  clickHandler={clickHandler}
                />
              ))}
            </div>
          </>
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
            <Link href={"/store"} >
            <LuShoppingCart />
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <AiOutlineHome />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CheckoutPage;
