import CheckoutPage from "@/components/modules/cart/CheckoutPage";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";

export default async function Checkout() {
  const res = await fetch("http://localhost:3000/api/product", {
    method: "GET",
  });
  const products = await res.json();

  return <CheckoutPage products={products} />;
}
