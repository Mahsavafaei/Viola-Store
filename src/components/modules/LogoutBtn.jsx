"use client";
import { signOut } from "next-auth/react";


function LogoutBtn() {
  const logOutHandler = () => {
    signOut({ redirect: false }).then(() => {
      window.location = "/signin";
      // redirect.push("/signin") 
    });
  };
  return (
    <button
      onClick={logOutHandler}
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
    </button>
  );
}

export default LogoutBtn;
