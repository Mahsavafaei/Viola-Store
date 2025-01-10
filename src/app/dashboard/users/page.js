import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardUsersPage from "@/components/template/dashboard/users/DashboardUsersPage";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardUsers() {
  const session = await getServerSession(authOptions);
  const role = session.user.name[1];

  if (role !== "ADMIN") redirect("/dashboard");

  // const users = await User.find().lean();
  const users = await User.find();
  const plainUsers = users.map((user) => ({
    _id: user._id.toString(), // Convert ObjectId to string
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    name: user.name,
    pass: user.pass,
    confirmPass: user.confirmPass,
    gender: user.gender,
    role: user.role,
    enabled: user.enabled,
    image: user.image,
    createdAt: user.createdAt,
  }));

  return <DashboardUsersPage users={plainUsers} />;
}
