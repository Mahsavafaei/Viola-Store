"use client";

import Loader from "@/components/modules/Loader";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdPersonAdd, MdPersonAddAlt1 } from "react-icons/md";

function DashboardUsersPage({ users }) {
  // pass users as a state to be clean code
  const [data, setData] = useState(users);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchHandler = (e) => {
    const value = e.target.value;

    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue) {
      const searchFetch = async () => {
        const res = await fetch("/api/search/user", {
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

      searchFetch();
    }
  }, [searchValue]);

  const showIsLoading = isLoading && <Loader />;

  return (
    <div className="min-h-screen">
      <div className="flex flex-wrap items-center justify-around gap-5">
        <Link
          className="flex w-fit items-center gap-2 rounded-xl bg-darkColor px-5 py-2 text-white"
          href="/dashboard/users/addUser"
          onClick={() => setIsLoading(true)}
        >
          <MdPersonAdd />
          {isLoading ? showIsLoading : <span> افزودن کاربر جدید</span>}
        </Link>

        <input
          className="rounded-xl border-2 border-darkColor px-2 py-1"
          type="text"
          placeholder="جستجو کاربر"
          onChange={searchHandler}
        />
      </div>
      <h1 className="mt-10 text-center text-2xl font-black text-darkColor">
        کاربران
      </h1>
      {searchValue && (
        <p className="my-7 text-center text-sm font-bold">
          نتایج جست‌‌و‌جو برای عبارت`&ldquo;`{searchValue}`&ldquo;`
        </p>
      )}
      <div className="mt-8 flex flex-col items-center justify-between gap-5">
        {searchValue ? (
          searchResult.length >= 1 ? (
            searchResult.map((user, index) => (
              <Link
                className="group flex w-full items-center justify-between rounded-xl bg-midColor px-3 py-2 text-white"
                // error=> href={"dashboard/users/"+user._id}
                href={"/dashboard/users/" + user._id}
                key={index}
              >
                <span>{user.name + " " + user.lastName}</span>
                <span className="rounded bg-white px-2 py-1 text-darkColor group-hover:bg-white/70">
                  {" "}
                  مشاهده کاربر{" "}
                </span>
              </Link>
            ))
          ) : (
            <div className="my-14 text-center text-xl text-red-600">
              جستجو نتیجه ای در بر نداشت!
            </div>
          )
        ) : (
          data.map((user, index) => (
            <Link
              className="group flex w-full items-center justify-between rounded-xl bg-midColor px-3 py-2 text-white"
              // error=> href={"dashboard/users/"+user._id}
              href={"/dashboard/users/" + user._id}
              key={index}
            >
              <span>{user.name + " " + user.lastName}</span>
              <span className="rounded bg-white px-2 py-1 text-darkColor group-hover:bg-white/70">
                {" "}
                مشاهده کاربر{" "}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardUsersPage;
