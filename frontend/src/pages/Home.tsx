import React, { useEffect, memo } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home: React.FC = memo(() => {
  useEffect(() => {
    document.title = "Ordering App | Home";
  }, []);

  return (
    <div className="-mt-20 bg-gray-50">
      {/* Hero Section */}
      <div
        className="h-screen bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/flat-human-hands-hold-smartphone-with-mobile-app-ordering-fast-food-home-take-away-online-service-order-asian-italian-meals-pizza-burger-wok-box-with-noodles-delivery_88138-804.jpg?w=900&t=st=1727424486~exp=1727425086~hmac=d0acefc2ac7e700f2e5194f44eb56eb1d0136c593ddf0a2f4fa4c6deb9750020')",
        }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-15">
          <div className="px-2 text-center text-white">
            <h1 className="mb-4 text-5xl font-bold">
              Order Your Favorite Food
            </h1>
            <p className="mb-6 text-lg">
              Delicious meals and coffee delivered to your door
            </p>
            <Link
              to="/food-products"
              className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Items Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">Featured Items</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Item 1 */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Food Item"
                className="object-cover w-full h-40 mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold">Delicious Pizza</h3>
              <p className="text-gray-600">$9.99</p>
              <button className="px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Order Now
              </button>
            </div>

            {/* Item 2 */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Coffee"
                className="object-cover w-full h-40 mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold">Fresh Coffee</h3>
              <p className="text-gray-600">$4.99</p>
              <button className="px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Order Now
              </button>
            </div>

            {/* Item 3 */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Dessert"
                className="object-cover w-full h-40 mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold">Chocolate Cake</h3>
              <p className="text-gray-600">$5.99</p>
              <button className="px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
});

export default Home;
