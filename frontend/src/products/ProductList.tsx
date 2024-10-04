import React, { useEffect, useState, memo } from "react";
import axios from "../context/api";
import ProductListLoader from "./loaders/ProductListLoader";
import { Storage } from "../utils/Storage";
import { Link } from "react-router-dom";
import toastr from "toastr";
import "aos/dist/aos.css";
import AOS from "aos";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  old_price: number;
  image_url: string[];
  rating: number;
}

interface ProductListProps {
  isRefresh: boolean;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductList: React.FC<ProductListProps> = memo(
  ({ isRefresh, setOnSubmit }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState<{
      [key: number]: number;
    }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [isAddToCart, setIsAddToCart] = useState<Record<number, boolean>>({});
    const [showAnimation, setShowAnimation] = useState<Record<number, boolean>>(
      {}
    );
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [description, setDescription] = useState<string>("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
    const [rating, setRating] = useState<number>(0);
    const [search, setSearch] = useState<string>("");
    const [showFilter, setShowFilter] = useState<boolean>(false);

    useEffect(() => {
      AOS.init({
        duration: 500,
      });
    }, []);

    toastr.options = {
      positionClass: "toast-top-right",
      closeButton: true,
      progressBar: true,
      timeOut: 5000,
    };

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("/products");
          setProducts(response.data.products);
        } catch (error) {
          console.error("Failed to fetch products", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, [isRefresh]);

    const handleNextImage = (productId: number, totalImages: number) => {
      setCurrentImageIndex((prevState) => ({
        ...prevState,
        [productId]: ((prevState[productId] || 0) + 1) % totalImages,
      }));
    };

    const handlePrevImage = (productId: number, totalImages: number) => {
      setCurrentImageIndex((prevState) => ({
        ...prevState,
        [productId]:
          ((prevState[productId] || 0) - 1 + totalImages) % totalImages,
      }));
    };

    const handleAddToCart = async (product: Product) => {
      setIsAddToCart((prev) => ({ ...prev, [product.id]: true }));
      setOnSubmit(true);
      setCurrentProduct(product);
      try {
        const response = await axios.post(`/add-to-cart/${product.id}`, {
          product_id: product.id,
          quantity: 1,
        });
        if (response.status === 201) {
          setShowAnimation((prev) => ({ ...prev, [product.id]: true }));
          toastr.success(response.data.message, "Added to cart");
        }
      } catch (error) {
        console.error("Error adding product to cart", error);
      } finally {
        setIsAddToCart((prev) => ({ ...prev, [product.id]: false }));
        setOnSubmit(false);
        setTimeout(() => {
          setShowAnimation((prev) => ({ ...prev, [product.id]: false }));
        }, 1000);
      }
    };
    const handleFilter = () => {
      const filteredProducts = products.filter((product) => {
        const matchesDescription = description
          ? product.description === description
          : true;
        const matchesPrice =
          (priceRange[0] || priceRange[0] === 0) && priceRange[1]
            ? product.price >= priceRange[0] && product.price <= priceRange[1]
            : true;
        const matchesRating = product.rating >= rating;
        const matchesSearch = product.name
          .toLowerCase()
          .includes(search.toLowerCase());

        return (
          matchesDescription && matchesPrice && matchesRating && matchesSearch
        );
      });

      setFilteredProducts(filteredProducts);
    };

    useEffect(() => {
      handleFilter();
    }, [description, priceRange, rating, search, products]);

    const handleResetFilter = () => {
      setDescription("");
      setPriceRange([0, 0]);
      setRating(0);
      setSearch("");
    };

    return (
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="w-full lg:w-1/4">
          <div className="sticky p-4 rounded shadow-md top-10">
            <div className="flex justify-center mb-4 lg:hidden">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="w-full px-4 py-2 text-white bg-orange-500 rounded-md lg:hidden"
              >
                <i className="fas fa-filter"></i>{" "}
                {showFilter ? "Hide Filter" : "Show Filter"}
              </button>
            </div>
            {(showFilter || !showFilter) && (
              <div className={`lg:block ${!showFilter && "hidden"}`}>
                <h2 className="mb-4 text-lg font-bold">
                  <i className="far fa-filter"></i> Filter Products
                </h2>

                {/* Search */}
                <div className="mb-4">
                  <label
                    htmlFor="search"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Search Products
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-500"
                    placeholder="Search by name..."
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <select
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-500"
                  >
                    <option hidden value="">
                      Select Category
                    </option>
                    <option disabled>Select Category</option>
                    <option value="">All</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <label
                    htmlFor="priceRange"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Price Range
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([
                          parseFloat(e.target.value),
                          priceRange[1],
                        ])
                      }
                      className="w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-500"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          parseFloat(e.target.value),
                        ])
                      }
                      className="w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-500"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-500"
                  >
                    <option value={0}>All Ratings</option>
                    <option value={1}>1 Star & Up</option>
                    <option value={2}>2 Stars & Up</option>
                    <option value={3}>3 Stars & Up</option>
                    <option value={4}>4 Stars & Up</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
                <button
                  onClick={handleResetFilter}
                  className="w-full px-2 py-2 font-semibold text-white bg-gray-500 rounded hover:bg-gray-700"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="relative grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            // Loading state placeholder
            <ProductListLoader />
          ) : filteredProducts.length === 0 ? (
            // No products available placeholder
            <div className="flex items-center justify-center col-span-2 p-4 text-center md:col-span-3 lg:col-span-5">
              {search ? (
                <p className="text-lg text-gray-500">
                  No products matching "{search}" were found.
                </p>
              ) : description ? (
                <p className="text-lg text-gray-500">
                  No products matching "{description}" were found.
                </p>
              ) : priceRange[0] !== 0 || priceRange[1] !== 0 ? (
                <p className="text-lg text-gray-500">
                  No products matching the price "{priceRange[0]} and{" "}
                  {priceRange[1]}" range were found.
                </p>
              ) : rating !== 0 ? (
                <p className="text-lg text-gray-500">
                  No products matching the rating "{rating}" were found.
                </p>
              ) : (
                <p className="text-lg text-gray-500">
                  No products available at the moment.
                </p>
              )}
            </div>
          ) : (
            // Mapping through products when available
            filteredProducts.map((product) => (
              <div key={product.id}>
                <div className="p-3 bg-white rounded-lg shadow-md hover:border" data-aos="zoom-out-down">
                  <div className="relative">
                    {product.image_url && product.image_url.length > 0 ? (
                      <Link to={`/product-detail/${product.id}`}>
                        <img
                          loading="lazy"
                          src={Storage(
                            product.image_url[
                              currentImageIndex[product.id] || 0
                            ]
                          )}
                          alt={product.name}
                          className="object-cover w-full h-40 rounded-t-md"
                        />

                        {showAnimation[product.id] && (
                          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <img
                              src={Storage(currentProduct?.image_url[0] || "")}
                              alt={currentProduct?.name || "Product Image"}
                              className="rounded-full flying-image"
                            />
                          </div>
                        )}
                      </Link>
                    ) : (
                      // Placeholder for products without an image
                      <div className="flex items-center justify-center w-full h-40 bg-gray-200 rounded-t-md">
                        <p className="text-gray-400">Image not available</p>
                      </div>
                    )}
                    {/* Previous and Next buttons */}
                    {product.image_url && product.image_url.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            handlePrevImage(
                              product.id,
                              product.image_url.length
                            )
                          }
                          className="absolute left-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-black bg-opacity-50 top-1/2 hover:bg-opacity-75"
                        >
                          &#10094;
                        </button>
                        <button
                          onClick={() =>
                            handleNextImage(
                              product.id,
                              product.image_url.length
                            )
                          }
                          className="absolute right-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-black bg-opacity-50 top-1/2 hover:bg-opacity-75"
                        >
                          &#10095;
                        </button>
                      </>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="p-2">
                    <Link to={`/product-detail/${product.id}`}>
                      <h2 className="text-base font-semibold">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-gray-900">
                        ₱{product.price}{" "}
                        <span className="text-gray-500 line-through">
                          ₱{product.old_price}
                        </span>
                      </p>
                      <div className="flex items-center mb-4 text-center">
                        {Array.from({ length: 5 }, (_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`size-6 ${
                              index < Math.round(product.rating)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                    </Link>
                    <div className="flex flex-col items-center justify-center gap-2 mt-2">
                      <button
                        disabled={isAddToCart[product.id]}
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center w-full px-4 py-2 text-sm text-white transition-colors duration-300 ease-in-out bg-orange-600 rounded-md hover:bg-orange-700"
                      >
                        <i className="mr-2 text-xs far fa-cart-plus"></i>
                        <span className="text-xs">
                          {isAddToCart[product.id]
                            ? "Adding..."
                            : "Add to Cart"}
                        </span>
                      </button>
                      <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-white transition-colors duration-300 ease-in-out bg-blue-600 rounded-md hover:bg-blue-700">
                        <i className="mr-2 text-xs far fa-cart-shopping"></i>
                        <span className="text-xs">Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
);

export default ProductList;
