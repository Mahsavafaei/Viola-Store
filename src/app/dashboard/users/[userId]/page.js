import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import DashboardUserPage from "@/components/template/dashboard/users/DashboardUserPage";

export default async function DashboardUser({ params: { userId } }) {
  console.log("userId:", userId);

  const session = await getServerSession(authOptions);
  const role = session.user.name[1];
  if (role !== "ADMIN") redirect("/dashboard");

  const user = await User.findById(userId, {
    name: 1,
    lastName: 1,
    email: 1,
    phone: 1,
    image: 1,
  });
//  const finalUser = user ? user.toObject() : null
const userClient = user ? {  
  name: user.name,  
  lastName: user.lastName,  
  email: user.email,  
  phone: user.phone,  
  image: user.image,  
  _id: user._id.toString(), // تبدیل _id به رشته  
} : null;  
  return <DashboardUserPage user={userClient} />;
}
