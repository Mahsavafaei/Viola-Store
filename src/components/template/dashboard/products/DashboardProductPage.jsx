"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import { MdDelete, MdModeEdit } from "react-icons/md";

function DashboardProductPage({ product }) {

  const router = useRouter()
  // console.log(product);
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

  const deleteProductHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/product/`+_id, { method: "DELETE",});
      
      const data = await res.json();     

      if (res.ok) {
        toast.success("محصول با موفقیت حذف شد");
        router.replace('/dashboard/products/')
      } else {
        toast.error(data.error || "خطا در حذف محصول");
      }
    } catch (error) {
      console.log(error);
      toast.error("خطا در حذف محصول");
    }
  };
  return (
    <div className="flex flex-col justify-between gap-5">
      <Toaster />
      <h1 className="text-center text-xl font-black text-darkColor">
        {productName}
      </h1>

      <div className="flex w-1/4 flex-row items-center justify-end">
        {/* Edit Btn */}

        <Link
          href={`/dashboard/products/editProduct/` + _id}
          className="group ml-auto flex max-w-fit cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-b from-[#fbaf23] to-[#fbbe23]/50 px-4 py-3 font-medium text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          {/* onClick={editProductHandler} */}
          {/* <button  className="group ml-auto flex max-w-fit cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-b from-[#fbaf23] to-[#fbbe23]/50 px-4 py-3 font-medium text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"> */}
          <div className="relative overflow-hidden">
            <p className="duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">
              ویرایش
            </p>
            <p className="absolute left-4 top-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0">
              {/* <IoMdArrowRoundBack className="text-xl" /> */}
              <MdModeEdit className="text-xl" />
            </p>
          </div>
        </Link>

        {/* Delete Btn */}
        <button
          onClick={deleteProductHandler}
          className="group ml-auto flex max-w-fit cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-b from-[#f87171] to-[#f87171]/50 px-6 py-3 font-medium text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          <div className="relative overflow-hidden">
            <p className="duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">
              حذف
            </p>
            <p className="absolute left-2 top-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0">
              <MdDelete className="text-xl" />
            </p>
          </div>
        </button>
      </div>
      <Image
        className="mx-auto border border-darkColor"
        src={productImage}
        alt={productName}
        width={150}
        height={150}
      />
      <ul className="flex flex-col justify-between gap-5 text-gray-600">
        <li>{"📏اندازه:  " + productSize}</li>
        <li> {"🏷️قیمت:      " + productPrice + " تومان "}</li>
        <li>{"#️⃣شابک: " + productShabak}</li>
        <li>{"📄تعدادصفحه: " + productPageNum}</li>
        <li>{"⏱️سال انتشار: " + productYear}</li>
        <li>{"🔠زبان: " + productLanguage}</li>
        <li>{"✍نویسنده: " + productWriter}</li>
        <li>{"💬توضیحات: " + productDesc}</li>
      </ul>
    </div>  

    
   
  );
}

export default DashboardProductPage;
