import StorePage from "@/components/template/store/StorePage";

export default async function store() {
  const res = await fetch("http://localhost:3000/api/product" , {method:'GET'});
  const products = await res.json()
  

  return <StorePage products={products} />;
}
