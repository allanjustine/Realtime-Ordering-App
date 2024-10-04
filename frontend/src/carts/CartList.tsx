import React, { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartListProps {
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onQuantityChange: (id: number, change: number) => void;
  onDeleteSelected: (selectedIds: number[]) => void;
}

const CartList: React.FC<CartListProps> = ({
  cartItems,
  onRemoveItem,
  onQuantityChange,
  onDeleteSelected,
}) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectChange = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    onDeleteSelected(selectedItems);
    setSelectedItems([]); // Clear selected items after deletion
  };

  return (
    <div>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between mt-3 mb-4"
        >
          <input
            type="checkbox"
            checked={selectedItems.includes(item.id)}
            onChange={() => handleSelectChange(item.id)}
            className="mr-2"
          />
          <img src={item.image} alt={item.name} className="w-12 h-12 mr-2" />
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col w-[5.9rem]">
              <p title={item.name} className="text-sm font-medium truncate text-wrap md:text-balance">{item.name}</p>
              <p className="text-xs text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => onQuantityChange(item.id, -1)}
                className="px-2 text-gray-600 hover:text-gray-800"
              >
                -
              </button>
              <span className="px-2 text-sm">{item.quantity}</span>
              <button
                onClick={() => onQuantityChange(item.id, 1)}
                className="px-2 text-gray-600 hover:text-gray-800"
              >
                +
              </button>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="ml-2 text-xs text-red-800 underline hover:text-red-500"
              >
                Delete
              </button>
              <button className="ml-2 text-xs text-blue-800 underline hover:text-blue-500">
                Checkout
              </button>
            </div>
          </div>
        </div>
      ))}
      {selectedItems.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleDeleteSelected}
            className="w-full py-2 mt-2 text-xs text-white bg-gray-600 rounded hover:bg-gray-700"
          >
            Delete Selected
          </button>

          <button className="w-full py-2 mt-2 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartList;
