import AboutUsPage from "@/components/template/AboutUsPage";


export default async function AboutUs() {
   const res = await fetch("http://localhost:3000/api/product" , {method:'GET'});
  const products = await res.json()
  return <AboutUsPage products={products} />;
}