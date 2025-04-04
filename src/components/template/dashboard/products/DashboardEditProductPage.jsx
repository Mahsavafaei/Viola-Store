"use client";
import BackBtn from "@/components/modules/buttons/BackBtn";
import Loader from "@/components/modules/Loader";
import { S3 } from "aws-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { MdModeEdit } from "react-icons/md";

function DashboardEditProductPage({ product }) {
  console.log(product._id);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: product.productName,
    price: product.productPrice,
    pageNum: product.productPageNum,
    writer: product.productWriter,
    year: product.productYear,
    desc: product.productDesc,
    shabak: product.productShabak,
    language: product.productLanguage,
    size: product.productSize,
    image: product.productImage,
  });

  const formChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setForm({ ...form, [name]: value });
  };
  const fileHandler = (event) => {
    setForm({ ...form, image: event.target.files[0] });
    // console.log(event.target.files[0]);
  };

  const editProductHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    let imageUrl = "";

    // if (form.image !== "") {
    //   try {
    //     //Authorization
    //     const ACCESS_KEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
    //     const SECRET_KEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
    //     const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
    //     const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

    //     //Initialize S3 client
    //     const s3 = new S3({
    //       endpoint: ENDPOINT,
    //       accessKeyId: ACCESS_KEY,
    //       secretAccessKey: SECRET_KEY,
    //     });

    //     const params = {
    //       //name of th project
    //       Bucket: BUCKET,
    //       //name of the file as a key
    //       Key: form.image.name,
    //       // file itself
    //       Body: form.image,
    //     };

        
    //     // Upload file to S3
    //     const res = await s3.upload(params).promise();

    //     //Generate a permanent signed URL
    //     const permanentSignedUrl = s3.getSignedUrl("getObject", {
    //       Bucket: BUCKET,
    //       Key: form.image.name,
    //       Expires: 3153600000, //100years
    //     });

    //     imageUrl = permanentSignedUrl;
    //   } catch (error) {
    //     return toast.error(error.message);
    //   }
    // }



    //api call
   
   
    if (form.image && form.image instanceof File) {  
      try {  
          // اطلاعات لازم برای دسترسی به S3  
          const ACCESS_KEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;  
          const SECRET_KEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;  
          const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;  
          const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;  
  
          // راه‌اندازی کلاینت S3  
          const s3 = new S3({  
              endpoint: ENDPOINT,  
              accessKeyId: ACCESS_KEY,  
              secretAccessKey: SECRET_KEY,  
          });  
  
          const params = {  
              Bucket: BUCKET,  
              Key: `${Date.now()}_${form.image.name}`, // نام فایل  
              Body: form.image, // محتویات فایل  
          };  
  
          // بارگذاری فایل به S3  
          const uploadResult = await s3.upload(params).promise();  
          console.log("File uploaded successfully", uploadResult);  
  
          // استفاده از URL بارگذاری‌شده  
          imageUrl = uploadResult.Location; // URL فایل آپلود شده  
      } catch (error) {  
          toast.error(`خطا در بارگذاری تصویر: ${error.message}`);  
          setIsLoading(false); // اتمام وضعیت بارگذاری  
          return; // خروج از تابع در صورت وقوع خطا  
      }  
  }  
   
   
    const res = await fetch("/api/product", {
      method: "PATCH",
      body: JSON.stringify({
        productId: product._id,
        productName: form.name, // اینجا مطمئن شوید نام‌ها هماهنگ است
        productPrice: form.price,
        productSize: form.size,
        productDesc: form.desc,
        productImage: imageUrl,
        productWriter: form.writer,
        productLanguage: form.language,
        productShabak: form.shabak,
        productPageNum: form.pageNum,
        productYear: form.year,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
   console.log(data)

    if (res.status === 201) {
      toast.success("محصول با موفقیت ویرایش شد");

      router.refresh();
    } else {
      toast.error(data.error);
    }
    setIsLoading(false);
  };

  return (
    <main className="h-screen">
      {/* alert */}
      <Toaster />
      <BackBtn href={`/dashboard/products`} />
      <form className="mx-auto mt-1 flex flex-col items-center justify-between gap-5 rounded bg-lightColor/60 px-4 py-6 max-md:w-1/2 md:w-96">
        <h1>ویرایش محصول {product.productName}</h1>
        <input
          type="text"
          name="name"
          onChange={formChangeHandler}
          value={form.name}
          className="w-full rounded p-1 focus:outline-darkColor"
          placeholder="نام کتاب"
        />
        <input
          type="text"
          name="price"
          onChange={formChangeHandler}
          value={form.price}
          className="w-full rounded p-1"
          placeholder="قیمت کتاب"
        />
        <input
          type="number"
          name="pageNum"
          onChange={formChangeHandler}
          value={form.pageNum}
          className="w-full rounded p-1"
          placeholder="تعداد صفحه"
        />
        <input
          type="text"
          name="writer"
          onChange={formChangeHandler}
          value={form.writer}
          className="w-full rounded p-1"
          placeholder="نویسنده"
        />
        <input
          type="number"
          name="year"
          onChange={formChangeHandler}
          value={form.year}
          className="w-full rounded p-1"
          placeholder="سال انتشار"
        />
        <input
          type="text"
          name="desc"
          onChange={formChangeHandler}
          value={form.desc}
          className="w-full rounded p-1"
          placeholder="توضیحات"
        />
        <input
          type="number"
          name="shabak"
          onChange={formChangeHandler}
          value={form.shabak}
          className="w-full rounded p-1"
          placeholder="شماره شابک"
        />
        <input
          type="text"
          name="language"
          onChange={formChangeHandler}
          value={form.language}
          className="w-full rounded p-1"
          placeholder="زبان کتاب"
        />

        {/* select an image */}
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5 text-center">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  برای بارگذاری تصویر کلیک کنید
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                یا تصویر را اینجا رها کنید
              </p>
            </div>
            <input
              name="image"
              id="dropzone-file"
              type="file"
              onChange={fileHandler}
              className="hidden"
            />
          </label>
        </div>
        <select
          name="size"
          value="قطع(اندازه)"
          onChange={formChangeHandler}
          className="max-w-full rounded p-1 text-center"
        >
          <option disabled>قطع(اندازه)</option>
          <option value="رقعی">رقعی</option>
          <option value="نیم رقعی">نیم رقعی</option>
          <option value="وزیری">وزیری</option>
          <option value="رحلی بزرگ">رحلی بزرگ</option>
          <option value="رحلی">رحلی</option>
          <option value="خشتی بزرگ<">خشتی بزرگ</option>
          <option value="خشتی کوچک">خشتی کوچک</option>
          <option value="پالتویی بزرگ">پالتویی بزرگ</option>
          <option value="پالتویی کوچک">پالتویی کوچک</option>
          <option value="جیبی">جیبی</option>
        </select>
        {isLoading ? (
          <Loader />
        ) : (
          <button
            onClick={editProductHandler}
            className="group mx-auto flex max-w-fit cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-b from-[#fbaf23] to-[#fbbe23]/50 px-6 py-3 font-medium text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          >
            <div className="relative overflow-hidden">
              <p className="duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">
                ویرایش
              </p>
              <p className="absolute left-4 top-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0">
                <MdModeEdit className="text-xl" />
              </p>
            </div>
          </button>
        )}
      </form>
    </main>
  );
}

export default DashboardEditProductPage;
