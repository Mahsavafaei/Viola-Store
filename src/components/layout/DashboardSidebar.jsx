"use client";
import Link from "next/link";
import LogoutBtn from "../modules/buttons/LogoutBtn";
import { FaUsersCog } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";

function DashboardSidebar({ session, children }) {
  const role = session.user.name[1];

  return (
    <div className="relative max-h-screen overflow-hidden bg-lightColor/50">
      <aside className="fixed inset-y-0 right-0 max-h-screen w-60 bg-white shadow-md max-md:hidden">
        <div className="flex h-full flex-col justify-between">
          <div className="flex-grow">
            <div className="border-b px-4 py-6 text-center">
              <Link href="/" className="text-xl font-bold leading-none">
                <span className="text-darkColor">Viola</span>
              </Link>
            </div>
            <div className="p-4">
              <ul className="space-y-1">
                {role === "ADMIN" && (
                  <>
                    <li>
                      <Link
                        href="/dashboard/users"
                        className="flex items-center gap-2 rounded-xl bg-lightColor/50 px-4 py-3 text-sm font-bold text-black"
                      >
                        <FaUsersCog />
                        کاربران
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/products"
                        className="flex items-center gap-2 rounded-xl bg-lightColor/50 px-4 py-3 text-sm font-bold text-black"
                      >
                        <AiFillProduct />
                        محصولات
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <LogoutBtn />
            {/* <button onClick={logOutHandler}
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-xl bg-gray-900 px-4 text-sm font-semibold text-gray-300 transition hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className=""
                viewBox="0 0 16 16"
              >
                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </button>{" "} */}
            <span className="ml-2 text-sm font-bold">خروج</span>
          </div>
        </div>
      </aside>

      <main className="mr-60 min-h-screen overflow-auto rounded-3xl pt-16">
        <div className="px-6 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-5 w-full rounded-3xl bg-white p-8">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardSidebar;
