import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardEditProductPage from "@/components/template/dashboard/products/DashboardEditProductPage";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard({ params: { productId } }) {
 
  const session = await getServerSession(authOptions);
  const role = session.user.name[1];
  if (role !== "ADMIN") redirect("/dashboard");

  const product = await Product.findById(productId);
  console.log("productId:" , productId)

  const productClient = product
    ? {
        productName: product.productName,
        productPrice: product.productPrice,
        productSize: product.productSize,
        productDesc: product.productDesc,
        productImage: product.productImage,
        productWriter: product.productWriter,
        productLanguage: product.productLanguage ,
        productShabak: product.productShabak,
        productPageNum: product.productPageNum,
        productYear: product.productYear,
        createdAt: product.createdAt,

        _id: product._id.toString(),
      }
    : null;

  return <DashboardEditProductPage product={productClient} />;
}
