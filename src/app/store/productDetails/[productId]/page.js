import ProductDetailsPage from "@/components/template/store/ProductDetailsPage";
import Product from "@/models/Product";




export default async function ProductDetails({ params:{productId}}) {
  

  const product = await Product.findById(productId);
    console.log("productId:", productId);

    return <ProductDetailsPage product={product} />;
  }