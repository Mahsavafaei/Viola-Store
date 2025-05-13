import Image from "next/image";
import BackBtn from "../../modules/buttons/BackBtn";

async function ProductDetailsPage({ product }) {
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
    _id,
  } = product;

  return (
    <div className="mx-auto min-h-screen max-w-full  bg-lightColor/50">
      <div className="pb-14 w-full p-6">
        <div className="flex flex-col justify-between gap-5">

          {/* BackBtn */}
          <div className="flex min-w-full items-center pt-10">
            <BackBtn href={"/store"} />
          </div>

          <Image
            className="mx-auto mb-8 border border-darkColor"
            src={productImage}
            alt={productName}
            width={150}
            height={150}
          />
       <div className="bg-white shadow-xl w-full sm:max-w-[900px] mx-auto p-5 rounded-2xl">
          <ul className="flex flex-col justify-between gap-5 text-justify text-gray-600">
            <li>{"📕نام کتاب:  " + productName}</li>
            <li> {"🏷️قیمت:      " + productPrice + " تومان "}</li>
            <li>{"📄تعدادصفحه: " + productPageNum}</li>
            <li>{"📏اندازه:  " + productSize}</li>
            <li>{"🔠زبان: " + productLanguage}</li>
            <li>{"✍نویسنده: " + productWriter}</li>
            <li>{"#️⃣شابک: " + productShabak}</li>
            <li>{"⏱️سال انتشار: " + productYear}</li>
            <li>{"💬توضیحات: " + productDesc}</li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
