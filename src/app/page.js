import HomePage from "@/components/template/HomePage";
import Product from "@/models/Product";


export default async function Home() {
  const res = await fetch("http://localhost:3000/api/product", { method: "GET" });
  const products = await res.json();

  // const products = await Product.find();
  // const plainProducts = products.map((product) => ({
  //   _id: product._id.toString(), // Convert ObjectId to string
  //   productName: product.productName,
  //   productPrice: product.productPrice,
  //   productSize: product.productSize,
  //   productDesc: product.productDesc,
  //   productWriter: product.productWriter,
  //   productLanguage: product.productLanguage,
  //   productShabak: product.productShabak,
  //   productPageNum: product.productPageNum,
  //   productYear: product.productYear,
  //   productImage: product.productImage,
  //   createdAt: product.createdAt,
  // }));
 
  return <HomePage products={products} />;
}
