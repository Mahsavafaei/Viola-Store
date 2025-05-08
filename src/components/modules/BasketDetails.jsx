import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";

function BasketDetails({ data , clickHandler }) {
  
  return (
    <div className="flex justify-between items-center p-5 rounded-2xl h-40 shadow-xl bg-white border mb-5 gap-5">
      <Image
        height={70}
        width={70}
        src={data.productImage}
        alt={data.productName}
      />
      <p className="line-clamp-1 font-medium">{data.productName}</p>
      <div className="flex items-center">
      {data.quantity === 1 && (
        <button className="bg-red-500 text-white rounded-lg p-1 cursor-pointer" onClick={()=> clickHandler('REMOVE_ITEM' , data)}> 
          <MdDeleteOutline />
        </button>
      )}
       {data.quantity > 1 && <button  className="h-6 w-6 cursor-pointer rounded-lg bg-darkColor leading-6 text-white" onClick={()=> clickHandler('DECREASE' , data)}>-</button>}
       <span className="mx-1">{data.quantity}</span>
       <button  className="h-6 w-6 cursor-pointer rounded-lg bg-darkColor leading-6 text-white" onClick={()=> clickHandler('INCREASE' , data)}>+</button>
      </div>
    </div>
  );
}

export default BasketDetails;
