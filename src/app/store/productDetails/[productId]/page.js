import ProductDetailsPage from "@/components/template/store/ProductDetailsPage";
import Product from "@/models/Product";

export default async function ProductDetails({ params: { productId } }) {
   const res = await fetch('http://localhost:3000/api/product' , {method:'GET'})
   const products = await res.json()
  

  const product = await Product.findById(productId);
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

  return <ProductDetailsPage product={productClient} products={products} />;
}
