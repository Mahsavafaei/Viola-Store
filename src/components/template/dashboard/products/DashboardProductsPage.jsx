import Link from "next/link";
import { MdOutlineAddBusiness } from "react-icons/md";

function DashboardProductsPage() {
  
  return (
    <div className="h-screen">
      <div className="flex flex-wrap items-center justify-around">
        <Link
          className="flex w-fit items-center gap-2 rounded-xl bg-darkColor px-2 py-1 text-white"
          href="/dashboard/products/addProduct"
        
        >
          <MdOutlineAddBusiness />
          افزودن محصول جدید
        </Link>
        <input
          className="rounded border-2 border-darkColor px-2 py-1"
          type="text"
          placeholder="جستجو محصول"
        />
      </div>
      <h1 className="mt-10 text-center text-2xl font-black text-darkColor">
        محصولات
      </h1>
    </div>
  );
}

export default DashboardProductsPage;
