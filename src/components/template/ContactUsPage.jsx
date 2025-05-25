'use client'
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhoneCall } from "react-icons/lu";
import { useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import { productQuantity } from "@/helpers/helper";

function ContactUsPage({products}) {

   //Save cartData to localStorage =>
    const { state, dispatch } = useContext(CartContext);

      const data = products.products;
    // گرفتن آی‌دی‌های محصولات
    const uniId = data.map((product) => product._id);
  
    // مقدار کمیت هر محصول بر اساس آی‌دی‌ها
    const quantities = uniId.map((id) => productQuantity(state, id));
    
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
    
  return (
    <main className="min-h-screen bg-lightColor/50 pb-20">
      <h1 className="py-10 text-center text-3xl font-black text-darkColor">
        تماس با ما
      </h1>
      <div className="mx-auto pt-32 my-10 flex w-4/5 flex-col items-center gap-10 rounded-full bg-white px-4 shadow-xl lg:max-w-[1000px] lg:rounded-3xl">
        <div className="group flex h-80 w-72 flex-col items-center justify-between gap-5 rounded-xl bg-lightColor/50 p-5 py-10 text-green-900 transition-all duration-300 ease-in-out hover:shadow-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-[27px] bg-darkColor transition-all duration-300 ease-in-out group-hover:bg-white group-hover:border-solid border-darkColor/60 border-[1px]">
            <span className="text-3xl text-white group-hover:text-darkColor">
              <FaInstagram />
            </span>
          </div>
          <h4 className="text-center text-xl font-bold">
            {" "}
            ما را در شبکه‌های اجتماعی دنبال کنید.
          </h4>
          <p className="group-hover:underline"> viola_store_book@ </p>
        </div>
        <div className="group flex h-80 w-72 flex-col items-center justify-between gap-5 rounded-xl bg-lightColor/50 p-5 py-10 text-green-900 transition-all duration-300 ease-in-out hover:shadow-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-[27px] bg-darkColor transition-all duration-300 ease-in-out group-hover:bg-white group-hover:border-solid border-darkColor/60 border-[1px]">
            <span className="text-3xl text-white group-hover:text-darkColor">
              <HiOutlineMail />
            </span>
          </div>
          <h4 className="text-center text-xl font-bold">
            {" "}
            با ما از طریق ایمیل در ارتباط باشید.
          </h4>
          <p className="group-hover:underline"> viola@store.com </p>
        </div>
        <div className="group flex h-80 w-72 flex-col items-center justify-between gap-5 rounded-xl bg-lightColor/50 p-5 py-10 text-green-900 transition-all duration-300 ease-in-out hover:shadow-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-[27px] bg-darkColor transition-all duration-300 ease-in-out group-hover:bg-white group-hover:border-solid border-darkColor/60 border-[1px]">
            <span className="text-3xl text-white group-hover:text-darkColor">
              <LuPhoneCall />
            </span>
          </div>
          <h4 className="text-center text-xl font-bold">
            با شماره‌تلفن تماس بگیرید.
          </h4>
          <p className="group-hover:underline"> 02188565698</p>
        </div>
        <div></div>
        <div></div>
      </div>
    </main>
  );
}

export default ContactUsPage;
