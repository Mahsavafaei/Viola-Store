import Image from "next/image";

function DashboardProductPage({ product }) {
  console.log(product);
  const {
    productName,
    productPrice,
    productSize,
    productDesc,
    productPageNum,
    productImage,
    productWriter,
    productLanguage,
    productShabak,
    productYear,
  } = product;
  return (
    <div className="flex flex-col  justify-between gap-5">
      <h1 className="font-black text-xl text-center text-darkColor">{productName}</h1>
      
      <div className="flex items-center gap-2 ">
    <button className="">ویرایش </button><button className="">حذف </button>
      </div>
      <Image className="border border-darkColor mx-auto" src={productImage} alt={productName} width={150} height={150}/>
      <ul className=" text-gray-600 flex flex-col justify-between gap-5">
        <li>{"📏اندازه:  " + productSize}</li>
        <li> { "🏷️قیمت:      " +productPrice + " تومان "}</li>
        <li>{"#️⃣شابک: " + productShabak}</li>
        <li>{"📄تعدادصفحه: "+productPageNum}</li>
        <li>{"⏱️سال انتشار: "+productYear}</li>
        <li>{"🔠زبان: "+productLanguage}</li>
        <li>{"✍نویسنده: "+productWriter}</li>
        <li>{"💬توضیحات: "+productDesc}</li>
      </ul>
     
    </div>
  );
}

export default DashboardProductPage;
