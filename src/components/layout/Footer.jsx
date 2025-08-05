"use client";
import React, { Suspense, lazy } from 'react';
const LazyLottie = lazy(() => import('lottie-react'));
import { usePathname } from "next/navigation";
import Image from "next/image";
import linkedin from "../../../public/footer/linkedin.png";
import mail from "../../../public/footer/mail.png";
import cellphone from "../../../public/footer/cellphone.png";
import instagram from "../../../public/footer/instagram.png";
import readingBook from "../../../public/footer/readingBook.json";
import enamad from "../../../public/footer/ENAMAD.png";
import Link from "next/link";
import Lottie from "lottie-react";

function Footer() {
  const currentPage = usePathname();

  return (
    <footer
      className={currentPage.startsWith("/dashboard") ? "hidden" : "block"}
    >
      <div className="h-[2px] w-3/4 mx-auto justify-center text-center bg-gradient-to-r from-transparent via-darkColor to-transparent"></div>
      <div className="footer-gradient   relative -z-[51] overflow-hidden bg-white px-24 pt-[100px] md:px-32 lg:px-10">
        {/* <Image
          src={readingBook}
          alt=""
          className="absolute -bottom-[55px] -left-[40px] -z-40"
        /> */}
        {/* <Image
          src={featherL}
          alt=""
          className="absolute left-0 -z-50 sm:bottom-[200px] md:bottom-[183px]"
        />
        <Image
          src={featherR}
          alt=""
          className="absolute right-0 -z-50 sm:bottom-[150px] md:bottom-[10px]"
        /> */
     /* <Image
          src={foggy}
          alt=""
          className="absolute bottom-0 right-0 -scale-x-100 sm:-z-10 md:opacity-80 lg:opacity-100"
        />
        <Image
          src={foggy}
          alt=""
          className="absolute bottom-0 left-0 -z-10 opacity-80"
        />
        <Image
          src={foggyFullSmall}
          alt=""
          className="absolute bottom-[50px] left-[150px] -z-30 opacity-70"
        />
        <Image
          src={foggyFullSmall}
          alt=""
          className="absolute -left-[100px] bottom-[50px] -z-30 opacity-60"
        /> */}
        <div className="z-20 mx-auto max-w-[1490px] lg:mb-0  flex flex-wrap items-center max-md:justify-center lg:justify-between">
          {/*content*/}
          <div className="mb-[50px] flex max-w-[800px] max-md:flex-col flex-wrap items-start justify-between gap-16 text-darkColor  lg:mb-[200px]">
            <ul className="flex flex-col  justify-between gap-6 ">
              <li className="text-lg font-bold">درباره ی ما</li>
              <li>دنیای شگفت‌انگیز کتاب‌ها اینجاست.</li>
              <li> تهران، خیابان ولیعصر. </li>
              {/* <li>درباره هیچ کس</li> */}
            </ul>

            {/* <ul className="flex flex-col items-center justify-between gap-6">
              <li className="text-lg font-bold">خدمات</li>
              <li>بالش</li>
              <li>پتو</li>
              <li>تشک</li>
            </ul> */}

            <ul className="flex flex-col items-start justify-between gap-6">
              <li className="flex items-center text-lg font-bold">
                راه های ارتباطی
              </li>
              <li className="flex items-center gap-6">
                <Image src={cellphone} alt="" />
                <span>تلفن : 02188565698</span>
              </li>
              <li className="flex items-center gap-4">
                <Image src={mail} alt="email" />
                <span>ایمیل : viola@store.com</span>
              </li>
              <li className="flex gap-2">
                <span>شبکه های اجتماعی :</span>
                <div className="flex items-center gap-3">
                  <Image src={instagram} alt="instagram" className="h-6 w-6" />
                  <Image src={linkedin} alt="linkedin" className="h-6 w-6" />
                </div>
              </li>
            </ul>
          <Image src={enamad} alt="ENAMAD" className="mx-auto !cursor-pointer" />
          </div>
      

    
          {/* <Lottie
         
          animationData={readingBook}
          className=""
          loop={true}
          style={{ height: "350px" }}
        /> */}
         <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <LazyLottie
          animationData={readingBook}
          className=""
          loop={true}
          style={{ height: "350px" }}
        />
      </Suspense>
        </div>
           {/*copyright*/}
           <div className="z-20 flex mb-6 mx-auto  mt-[80px] w-fit max-sm:text-[10px] sm:text-[#12212E] md:text-[#121b2796]">
            
           توسعه‌داده‌شده با❤️توسط وب‌بیزینس - ©️۱۴۰۴
          </div>
      </div>
    </footer>
  );
}

export default Footer;
