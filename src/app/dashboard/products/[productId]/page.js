import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardProductPage from "@/components/template/dashboard/products/DashboardProductPage";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardProduct({ params: { productId } }) {
  console.log("productId:", productId);

  const session = await getServerSession(authOptions);
  const role = session.user.name[1];
  if (role !== "ADMIN") redirect("/dashboard");

  const product = await Product.findById(productId);
  console.log("product:", product);

  return <DashboardProductPage product={product} />;
}
