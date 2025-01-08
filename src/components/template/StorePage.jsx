export default async function StorePage() {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/product`, {
    cache: "no-store",
  });
  const data = await res.json();

  console.log(data.products);
  return (
    <main>
      <h1>به فروشگاه ما خوش آمدید</h1>
      {data.products.length >= 1 &&
        data.products.map((product, index) => (
          <CardProduct key={index} {...product} />
        ))}
    </main>
  );
}
