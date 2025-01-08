
import User from "@/models/User";
import Link from "next/link";
import { MdPersonAddAlt1 } from "react-icons/md";

async function DashboardUsersPage() {
  const users = await User.find();
 
  return (
    <div>
      <div className="flex flex-wrap items-center justify-around">
        <Link
          className="flex w-fit items-center gap-2 rounded-xl bg-darkColor px-2 py-1 text-white"
          href="/dashboard/users/addUser"
        >
          <MdPersonAddAlt1 />
          افزودن کاربر جدید
        </Link>
        <input
          className="rounded border-2 border-darkColor px-2 py-1"
          type="text"
          placeholder="جستجو کاربر"
        />
      </div>
      <h1 className="mt-10 text-center text-2xl font-black text-darkColor">
        کاربران
      </h1>
      <div className="mt-8 flex flex-col items-center justify-between gap-5">
        
        {users.map((user, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default DashboardUsersPage;
