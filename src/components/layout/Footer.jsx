"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import linkedin from "../../../public/footer/linkedin.png";
import mail from "../../../public/footer/mail.png";
import cellphone from "../../../public/footer/cellphone.png";
import instagram from "../../../public/footer/instagram.png";

function Footer() {
  const currentPage = usePathname();

  return (
    <footer
      className={currentPage.startsWith("/dashboard") ? "hidden" : "block"}
    >
      <div className="footer-gradient relative -z-[51] overflow-hidden bg-white px-24 pt-[100px] md:px-32 lg:px-10">
        {/* <Image
          src={cloud}
          alt=""
          className="absolute -bottom-[55px] -left-[40px] -z-40"
        />
        <Image
          src={featherL}
          alt=""
          className="absolute left-0 -z-50 sm:bottom-[200px] md:bottom-[183px]"
        />
        <Image
          src={featherR}
          alt=""
          className="absolute right-0 -z-50 sm:bottom-[150px] md:bottom-[10px]"
        /> */}
        {/* <Image
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
        <div className="z-20 lg:mb-0 lg:mr-11">
          {/*content*/}
          <div className="mb-[280px] flex max-w-[600px] flex-wrap items-start justify-center gap-10 text-darkColor sm:justify-between lg:mb-[200px]">
            <ul className="flex flex-col items-center justify-between gap-6">
              <li className="text-lg font-bold">درباره ی ما</li>
              <li>درباره شما</li>
              <li>درباره اونا</li>
              <li>درباره هیچ کس</li>
            </ul>

            <ul className="flex flex-col items-center justify-between gap-6">
              <li className="text-lg font-bold">خدمات</li>
              <li>بالش</li>
              <li>پتو</li>
              <li>تشک</li>
            </ul>

            <ul className="flex flex-col items-start justify-between gap-6">
              <li className="flex items-center text-lg font-bold">
                راه های ارتباطی
              </li>
              <li className="flex items-center gap-6">
                <Image src={cellphone} alt="" />
                <span>تلفن : 02188565698</span>
              </li>
              <li className="flex items-center gap-4">
                <Image src={mail} alt="" />
                <span>ایمیل : sleepy@shop.com</span>
              </li>
              <li className="flex gap-2">
                <span>شبکه های اجتماعی :</span>
                <div className="flex items-center gap-3">
                  <Image src={instagram} alt="" className="h-6 w-6" />
                  <Image src={linkedin} alt="" className="h-6 w-6" />
                </div>
              </li>
            </ul>
          </div>

          {/*copyright*/}
          <div className="z-20 mx-auto mb-5 mt-[80px] w-fit sm:text-[#12212E] md:text-[#f5f7fa96]">
            حق کپی رایت فروشگاه bedven محفوظ می باشد.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
