import React, { useState } from "react";
import axios from "../../context/api";
import { useAuth } from "../../context/AuthContext";
import toastr from "toastr";

interface AddProductModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  toggleModal,
  setIsRefresh,
}) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState<number | string>("");
  const [productOldPrice, setProductOldPrice] = useState<number | string>("");
  const [productQuantity, setProductQuantity] = useState<number | string>("");
  const [productImages, setProductImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  toastr.options = {
    positionClass: "toast-top-right",
    closeButton: true,
    progressBar: true,
    timeOut: 5000,
  };

  const { user } = useAuth();
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsRefresh(true);
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", String(productPrice));
    formData.append("old_price", String(productOldPrice));
    formData.append("quantity", String(productQuantity));
    productImages.forEach((image) => {
      formData.append("images[]", image);
    });
    try {
      const response = await axios.post("/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductOldPrice("");
        setProductQuantity("");
        setProductImages([]);
        setErrors({});
        toggleModal();
        toastr.success(response.data.message, "Product added");
      }
    } catch (error: any) {
      if (error.status === 422) {
        setErrors(error.response.data.errors || {});
      }
      console.error("Error adding product", error);
    } finally {
      setLoading(false);
      setIsRefresh(false);
    }
  };

  const handleRemoveImage = (imageName: string) => {
    setProductImages((prevImages) =>
      prevImages.filter((image) => image.name !== imageName)
    );
  };

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // Handle file input event
    setProductImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    setProductImages((prevImages) => [...prevImages, ...droppedFiles]);
    setIsHovering(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
  };

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleModal}
          ></div>

          {/* Modal content */}
          <div className="z-50 w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Add Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="overflow-y-auto max-h-[70vh] p-2">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="productName"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter product name"
                  />
                  {errors.name &&
                    errors.name.map((error, index) => (
                      <p key={index} className="text-red-500">
                        {error}
                      </p>
                    ))}
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="productDescription"
                  >
                    Description
                  </label>
                  <textarea
                    id="productDescription"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter product description"
                  ></textarea>
                  {errors.description &&
                    errors.description.map((error, index) => (
                      <p key={index} className="text-red-500">
                        {error}
                      </p>
                    ))}
                </div>

                <div className="flex flex-row items-center gap-3 mb-4">
                  <div className="flex-1">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="productPrice"
                    >
                      Original Price
                    </label>
                    <input
                      type="number"
                      id="productPrice"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter product price"
                    />
                    {errors.price &&
                      errors.price.map((error, index) => (
                        <p key={index} className="text-red-500">
                          {error}
                        </p>
                      ))}
                  </div>
                  <div className="flex-1">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="productOldPrice"
                    >
                      Old Price
                    </label>
                    <input
                      type="number"
                      id="productOldPrice"
                      value={productOldPrice}
                      onChange={(e) => setProductOldPrice(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter product old price"
                    />
                    {errors.old_price &&
                      errors.old_price.map((error, index) => (
                        <p key={index} className="text-red-500">
                          {error}
                        </p>
                      ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="productOldPrice"
                  >
                    Product Quantity
                  </label>
                  <input
                    type="number"
                    id="productQuantity"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter product quantity"
                  />
                  {errors.quantity &&
                    errors.quantity.map((error, index) => (
                      <p key={index} className="text-red-500">
                        {error}
                      </p>
                    ))}
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="productImages"
                  >
                    Images
                  </label>

                  {/* Drag and Drop area */}
                  <div
                    className={`relative w-full p-6 text-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
                      ${isHovering ? "bg-gray-200" : "hover:bg-gray-100"}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() =>
                      document.getElementById("productImages")?.click()
                    }
                  >
                    <input
                      type="file"
                      id="productImages"
                      accept="image/*"
                      multiple
                      onChange={handleInputFileChange}
                      className="hidden"
                    />
                    <p className="text-gray-500">
                      Drag and drop your images here, or{" "}
                      <span className="text-blue-500">click to upload</span>
                    </p>
                  </div>

                  {/* Display Errors */}
                  {errors.images &&
                    errors.images.map((error, index) => (
                      <p key={index} className="text-red-500">
                        {error}
                      </p>
                    ))}

                  {Object.keys(errors).map((key) => {
                    if (key.startsWith("images.")) {
                      return errors[key].map((error, index) => (
                        <p key={index} className="text-red-500">
                          {error}
                        </p>
                      ));
                    }
                    return null;
                  })}
                </div>

                {/* "Remove All" Button */}
                {productImages.length > 0 && (
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={() => setProductImages([])}
                      className="px-3 py-1 text-xs text-white bg-red-700 rounded-lg hover:bg-red-500"
                    >
                      Remove All
                    </button>
                  </div>
                )}

                {/* Preview Images and Progress */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                  {productImages.map((image) => (
                    <div
                      key={image.name}
                      className="relative bg-white rounded-lg shadow-md"
                    >
                      <div className="relative">
                        {/* Preview Image */}
                        <img
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                          className="object-cover w-full h-20 rounded-md"
                        />

                        {/* "X" Button */}
                        <button
                          onClick={() => handleRemoveImage(image.name)}
                          className="absolute top-0 right-0 w-6 h-6 text-xs font-bold text-white rounded-full"
                        >
                          <i className="text-lg text-red-500 fa-solid fa-xmark hover:text-red-700"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-3 py-1 mr-2 text-xs text-white bg-gray-500 rounded-lg md:text-sm hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3 py-1 text-xs text-white bg-blue-500 rounded-lg md:text-sm hover:bg-blue-700"
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductModal;
