'use client'
import { FaInstagram } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { GiBlackBook } from "react-icons/gi";
import { PiBookBold, PiListHeartBold } from "react-icons/pi";
import { productQuantity } from "@/helpers/helper";
import { useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
function AboutUsPage({products}) {

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
        درباره ما
      </h1>

      <div className="mx-auto w-3/4 rounded-2xl bg-white px-5 py-9 text-green-900 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <h2 className="mb-10 flex items-center gap-2 text-xl font-bold">
          <span>
            {/* <GiBlackBook /> */}
            <PiListHeartBold />
          </span>
          رسالت فروشگاه ویولا{" "}
        </h2>
        <blockquote className="text-justify indent-9 leading-8">
          در ویولا، رسالت ما فراتر از فروش کتاب است؛ هدف ما ایجاد یک جامعه
          روشنفکر، خلاق و پرتلاش است. ما معتقدیم هر کتاب یک درِ به دنیایی جدید
          است و وظیفه‌ ماست که این در را برای همه باز کنیم. تیم ویولا متعهد است
          که بهترین مجموعه‌های کتاب در زمینه‌های مختلف را در اختیار علاقه‌مندان
          قرار دهد، با کیفیتی عالی و قیمتی منصفانه. با عشق و شور و اشتیاق، هر
          روز تلاش می‌کنیم تا سفرِ خواندنتان را با معرفی آثار ارزشمند، الهام‌بخش
          و بی‌نظیر، معنی‌دار کنیم. در ویولا، کتاب به عنوان پل ارتباطی میان
          دل‌ها و ذهن‌ها شناخته می‌شود، و رسالت ما پرورش این پل و گسترش فرهنگ
          مطالعه در جامعه است. ویولا، جایی برای کشف، یادگیری و پیشرفت.
        </blockquote>
      </div>
      <div className="mx-auto mt-24  flex h-[1300px] w-3/4 flex-col items-center justify-evenly rounded-full bg-white shadow-xl lg:max-w-[1000px] lg:rounded-3xl">
        {/* card */}
        <div className="group flex h-80 w-72 flex-col items-center justify-between gap-5 rounded-xl bg-lightColor/50 p-5 py-10 text-green-900 transition-all duration-300 ease-in-out hover:shadow-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-[27px] border-[1px] border-darkColor/60 bg-darkColor transition-all duration-300 ease-in-out group-hover:border-solid group-hover:bg-white">
            <span className="text-3xl text-white group-hover:text-darkColor">
              <SlLocationPin />
            </span>
          </div>
          <h4 className="text-center text-xl font-bold">اطلاعات مسیر یابی</h4>
          <address className="h-24 group-hover:underline">
            تهران، خیابان ولی‌عصر، خیابان امینی، فروشگاه کتاب ویولا.
          </address>
        </div>
        {/* map */}
        <div className="h-full max-h-[500px] w-full max-w-[370px] p-10 md:max-w-[600px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d202.39983447576685!2d51.407987444582346!3d35.741037134691425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDQ0JzI3LjgiTiA1McKwMjQnMjguNCJF!5e0!3m2!1sfa!2s!4v1747231610416!5m2!1sfa!2s"
            className="h-full w-full rounded-2xl border-none"
            title="viola-location"
            allowfullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </main>
  );
}

export default AboutUsPage;
