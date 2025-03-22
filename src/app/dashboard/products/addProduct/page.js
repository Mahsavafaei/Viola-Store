import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardAddProductPage from "@/components/template/dashboard/products/DashboardAddProductPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardProduct() {
  const session = await getServerSession(authOptions);
  const role = session.user.name[1];
  if (role !== "ADMIN") redirect("/dashboard");
  return <DashboardAddProductPage />;
}
