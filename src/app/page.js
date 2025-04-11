import HomePage from "@/components/template/HomePage";


export default async function Home() {
  const res = await fetch("http://localhost:3000//api/product", { method: "GET" });
  const products = await res.json();
 
  return <HomePage products={products} />;
}
