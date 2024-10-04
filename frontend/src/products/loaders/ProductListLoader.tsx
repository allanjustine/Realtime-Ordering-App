// Loader.tsx
import React from "react";

const ProductLoader: React.FC = () => {
  return (
    <div className="relative">
      <div className="relative">
        {/* Loader for image */}
        <div className="flex items-center justify-center w-full h-40 bg-gray-200 rounded-t-md animate-pulse">
          <p className="text-gray-400">
            <i className="fa-solid fa-image fa-2xl"></i>
          </p>
        </div>
      </div>

      {/* Product info loader */}
      <div className="p-2">
        <div className="h-4 mb-2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-3 mb-1 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-3 mb-2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 mb-3 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex flex-col items-center justify-center gap-2 mt-2">
          <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-white transition-colors duration-300 ease-in-out bg-yellow-500 rounded-md animate-pulse hover:bg-yellow-600">
            <i className="mr-2 text-xs far fa-cart-plus"></i>
            <span className="text-xs">Loading...</span>
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-white transition-colors duration-300 ease-in-out bg-blue-500 rounded-md animate-pulse hover:bg-blue-600">
            <i className="mr-2 text-xs far fa-cart-shopping"></i>
            <span className="text-xs">Loading...</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductListLoader: React.FC = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductLoader key={index} />
      ))}
    </>
  );
};

export default ProductListLoader;
