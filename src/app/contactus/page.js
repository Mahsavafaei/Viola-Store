import ContactUsPage from "@/components/template/ContactUsPage";

export default async function ContactUs() {
  const res = await fetch("http://localhost:3000/api/product" ,{method:'GET'})
  const products = await res.json()

  return <ContactUsPage products={products} />;
}
