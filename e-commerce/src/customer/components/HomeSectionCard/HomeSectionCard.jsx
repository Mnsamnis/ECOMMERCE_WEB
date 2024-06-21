import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {

  const navigate=useNavigate();

  
  
const handleClick=()=>{

  navigate(`/${product.topLevelCategory}/${product.secondLevelCategory}/${product.thirdLevelCategory}`)
  console.log(product)
}




  return (
    <div onClick={handleClick}
    className="cusron-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-2 hover:border border-gray-300 hover:shadow-2xl">
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={product.imageUrl}
          alt={product.title}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-500">
        {product.title.length > 20 ? `${product.title.substring(0, 25)}..` : product.title}
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
