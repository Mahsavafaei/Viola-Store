"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { MdDelete, MdModeEdit } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
function DashboardUserPage({ user }) {
  const { _id, name, lastName, email, phone, image } = user;
  const router = useRouter();

  const editHandler = () => {
    router.push(`/dashboard/users/editUser/${_id}`);
  };
  const deleteUserHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/${_id}`, { method: "DELETE" });
      
      const data = await res.json();

      if (res.ok) {
        toast.success("کاربر با موفقیت حذف شد");
        router.replace("/dashboard/users");
      } else {
        toast.error("خطا در حذف کاربر");
      }
    } catch (error) {
      console.log(error);
      toast.error("خطا در حذف کاربر");
    }
  };
  return (
    <div className="flex flex-col justify-between gap-5">
      <Toaster />
      <div className="text-center font-bold text-darkColor">
        {name + " " + lastName}
      </div>

      <div className="flex w-1/4 flex-row items-center justify-end">
        {/* Edit Btn */}
        <button
          onClick={editHandler}
          className="group ml-auto flex max-w-fit cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-b from-[#fbaf23] to-[#fbbe23]/50 px-4 py-3 font-medium text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          <div className="relative overflow-hidden">
            <p className="duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">
              ویرایش
            </p>
            <p className="absolute left-4 top-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0">
              {/* <IoMdArrowRoundBack className="text-xl" /> */}
              <MdModeEdit className="text-xl" />
            </p>
          </div>
        </button>

        {/* Delete Btn */}
        <button
          onClick={deleteUserHandler}
          className="group ml-auto flex max-w-fit cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-b from-[#f87171] to-[#f87171]/50 px-6 py-3 font-medium text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          <div className="relative overflow-hidden">
            <p className="duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">
              حذف
            </p>
            <p className="absolute left-2 top-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0">
              <MdDelete className="text-xl" />
            </p>
          </div>
        </button>
      </div>
      <Image
        src={image}
        width={150}
        height={150}
        className="mx-auto rounded-full border border-darkColor"
        alt={name + " " + lastName}
      />
      <ul className="flex flex-col justify-between gap-5 text-gray-600">
        <li>{email}</li>
        <li>{phone}</li>
      </ul>
    </div>
  );
}

export default DashboardUserPage;
