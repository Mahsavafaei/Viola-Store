import StorePage from "@/components/template/store/StorePage";
import Product from "@/models/Product";

export default async function store() {
  const res = await fetch("http://localhost:3000/api/product" , {method:'GET'});
  const products = await res.json()
  // const products = await Product.find();

  return <StorePage products={products} />;
}
