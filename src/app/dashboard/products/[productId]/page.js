import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardProductPage from "@/components/template/dashboard/products/DashboardProductPage";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardProduct({ params }) {
  const awaitedParams = await params;
  const productId = awaitedParams.productId;

  
  const session = await getServerSession(authOptions);
  const role = session.user.name[1];
  if (role !== "ADMIN") redirect("/dashboard");

  const product = await Product.findById(productId);
  
  const productClient = product ? {  
  productName: product.productName,  
  productPrice: product.productPrice,  
  productSize: product.productSize,  
  productDesc: product.productDesc,  
  productImage: product.productImage,  
  productWriter: product.productWriter,  
  productLanguage: product.productLanguage,  
  productShabak: product.productShabak,  
  productYear: product.productYear,  
  createdAt: product.createdAt,  
  _id: product._id.toString(), // تبدیل _id به رشته  
} : null;  

  return <DashboardProductPage product={productClient} />;
}
