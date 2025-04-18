import DashboardProductsPage from "@/components/template/dashboard/products/DashboardProductsPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Product from "@/models/Product";


export default async function Dashboard  () {
    const session = await getServerSession(authOptions);
    const role = session.user.name[1];
  
    if (role !== "ADMIN") redirect("/dashboard");
    const products = await Product.find();
    return (<DashboardProductsPage products={products} /> );
  }
  