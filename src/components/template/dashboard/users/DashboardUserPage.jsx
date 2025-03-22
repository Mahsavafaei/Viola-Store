"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

function DashboardUserPage({ user }) {
  const { _id, name, lastName, email, phone, image } = user;
  const router = useRouter();

  const editHandler = () => {
    router.push(`/dashboard/users/editUser/${_id}`);
  };
  return (
    <div className="flex flex-col justify-between gap-5">
     
      <div className="text-center font-bold text-darkColor">
        {name + " " + lastName}
      </div>
     
      <div>
        <button onClick={editHandler}>ویرایش کاربر</button>
      </div>
      <Image
        src={image}
        width={150}
        height={150}
        className=" mx-auto rounded-full border border-darkColor"
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
