import { FaInstagram } from "react-icons/fa";
import { IoCallOutline, IoShareSocialSharp } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhoneCall } from "react-icons/lu";

function ContactUsPage() {
  return (
    <main className="min-h-screen bg-lightColor/50 pb-20">
      <h1 className="py-10 text-center text-3xl font-black text-darkColor">
        تماس با ما
      </h1>
      <div className="mx-auto pt-10 my-10 flex w-4/5 flex-col items-center gap-10 rounded-full bg-white px-4  shadow-xl lg:max-w-[1000px] lg:rounded-3xl">
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
