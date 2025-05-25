'use client'
import Image from "next/image";
import BackBtn from "../../modules/buttons/BackBtn";
import { useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import { productQuantity } from "@/helpers/helper";

 function ProductDetailsPage({ product , products}) {
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
  const {
    productName,
    productPrice,
    productSize,
    productDesc,
    productPageNum,
    productImage,
    productWriter,
    productLanguage,
    productShabak,
    productYear,
    _id,
  } = product;

  return (
    <div className="mx-auto min-h-screen max-w-full bg-lightColor/50">
      <div className="w-full p-6 pb-14">
        <div className="flex flex-col justify-between gap-5">
          {/* BackBtn */}
          <div className="flex min-w-full items-center pt-10">
            <BackBtn href={"/store"} />
          </div>

          <Image
            className="mx-auto mb-8 border border-darkColor"
            src={productImage}
            alt={productName}
            width={150}
            height={150}
          />
          <div className="mx-auto w-full rounded-2xl bg-white p-5 shadow-xl sm:max-w-[900px]">
            <ul className="flex flex-col justify-between gap-5 text-justify text-gray-600">
              <li>{"📕نام کتاب:  " + productName}</li>
              <li> {"🏷️قیمت:      " + productPrice + " تومان "}</li>
              <li>{"📄تعدادصفحه: " + productPageNum}</li>
              <li>{"📏اندازه:  " + productSize}</li>
              <li>{"🔠زبان: " + productLanguage}</li>
              <li>{"✍نویسنده: " + productWriter}</li>
              <li>{"#️⃣شابک: " + productShabak}</li>
              <li>{"⏱️سال انتشار: " + productYear}</li>
              <li>{"💬توضیحات: " + productDesc}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
