"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineAddBusiness } from "react-icons/md";
import Loader from "@/components/modules/Loader";

function DashboardProductsPage({ products }) {
  //define data to be clean code in future for pagination or ...
  const [data, setData] = useState(products);
  const [isLoading, setIsLoading] = useState(false);

  const [searchValue, setSearchValue] = useState();
  const [searchResult, setSearchResult] = useState();

  const searchProductHandler = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue) {
      const search = async () => {
        const res = await fetch("/api/search/product", {
          method: "POST",
          body: JSON.stringify({
            searchValue,
          }),
        });

        if (res.status === 201) {
          const searchData = await res.json();
          setSearchResult(searchData);
        }
      };
      search();
    }
  }, [searchValue]);

  const showIsLoading = isLoading && <Loader/>

  return (
    <div className="min-h-screen">
      <div className="flex flex-wrap items-center justify-around gap-5">
        <Link
          className="flex w-fit items-center gap-2 rounded-xl bg-darkColor px-4  py-2 text-white"
          href="/dashboard/products/addProduct"
          onClick={()=> setIsLoading(true)}
        >
          <MdOutlineAddBusiness />
          {isLoading ? showIsLoading : <span>  افزودن محصول جدید</span>}

       
        </Link>
        <input
          className="rounded-xl border-2 border-darkColor px-2 py-1"
          type="text"
          placeholder="جستجو محصول"
          onChange={searchProductHandler}
        />
      </div>
      <h1 className="mt-10 text-center text-2xl font-black text-darkColor">
        محصولات
      </h1>
      {searchValue && <p className="text-center text-sm font-bold my-7">نتایج جست‌‌و‌جو برای عبارت`&ldquo;`{searchValue}`&ldquo;`</p>}
      <div className="mt-8 flex flex-col items-center justify-between gap-5">
        {searchValue ? (
          searchResult && searchResult.length >= 1 ? (
            searchResult.map((product, index) => (
              <Link
                href={"/dashboard/products/" + product._id}
                key={index}
                className="group flex w-full items-center justify-between rounded-xl bg-midColor px-3 py-2 text-white"
              >
                <div className="flex w-2/4 items-center justify-between gap-1">
                  <p className="truncate">{product.productName}</p>
                  <p>{product.productPrice}</p>
                </div>
                {/* <div className="flex w-1/4 items-center justify-end gap-2">
        
          <span className="rounded bg-white px-2 py-1 text-darkColor group-hover:bg-white/70">
            حذف 
          </span>
          </div> */}
                <span className="rounded bg-white px-2 py-1 text-darkColor group-hover:bg-white/70">
                  مشاهده
                </span>
              </Link>
            ))
          ) : (
            <div className="my-14 text-center text-base ">کتابی با این مشخصات یافت نشد!</div>
          )
        ) : (
          data.map((product, index) => (
            <Link
              href={"/dashboard/products/" + product._id}
              key={index}
              className="group flex w-full items-center justify-between rounded-xl bg-midColor px-3 py-2 text-white"
            >
              <div className="flex w-2/4  items-center justify-items-center justify-between gap-2">
                <p className="truncate">{product.productName}</p>
                <p>{product.productPrice}</p>
              </div>
           
              <span className="rounded bg-white px-2 py-1 text-darkColor group-hover:bg-white/70">
                مشاهده
              </span>
            </Link>
          ))
        )}
  
      </div>
    </div>
  );
}

export default DashboardProductsPage;
