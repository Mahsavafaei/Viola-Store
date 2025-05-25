import Image from "next/image";
import { NotFound } from "../../../public/index";

function NotFoundPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F4F6F8] pb-10">
      <div className="container gap-16 flex flex-col items-center justify-around">
        <div className="flex flex-col items-center text-xl font-bold text-red-500 ">
          <span>صفحه مورد نظر یافت نشد! </span>
        </div>
        <Image src={NotFound} width={400} height={400} alt="empty-cart" />
      
      </div>
    </div>
  );
}

export default NotFoundPage;
