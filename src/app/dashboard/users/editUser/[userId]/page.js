import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import DashboardEditUserPage from "@/components/template/dashboard/users/DashboardEditUserPage";


export default async function EditUser({ params: { userId } }) {
  

  const session = await getServerSession(authOptions);
  const role = session.user.name[1];
  if (role !== "ADMIN") redirect("/dashboard");

  const user = await User.findById(userId);
  const userClient = user ? {

    name: user.name,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    pass: user.pass,
    confirmPass: user.confirmPass,
    gender:user.gender,
    role: user.role,
    enabled: user.enabled,
    image: user.image,
    createdAt: user.createdAt,
    _id: user._id.toString()
  } :null;

  return <DashboardEditUserPage user={userClient} />;
}
