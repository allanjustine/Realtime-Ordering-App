import React, { memo, useEffect } from "react";
import Footer from "../components/Footer";

const About: React.FC = memo(() => {
  useEffect(() => {
    document.title = "Ordering App | About";
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-auto p-8 bg-gray-50">
        <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">
          About Our Ordering App
        </h1>

        <div className="max-w-3xl text-center">
          <p className="mb-4 text-lg text-gray-700">
            Welcome to our Ordering App, your go-to platform for seamless food
            and beverage ordering. We are passionate about connecting you with
            your favorite dishes and drinks from local restaurants.
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Our Mission
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            Our mission is to provide a hassle-free and enjoyable ordering
            experience, making it easy for you to satisfy your cravings from the
            comfort of your home or office.
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Key Features
          </h2>
          <ul className="flex flex-col mb-6 text-lg text-gray-600 list-disc list-inside">
            <li className="flex items-start mb-2">
              <span className="mr-2">👨‍🍳</span>
              <span>
                <strong>Wide Selection:</strong> Choose from a variety of
                restaurants and cuisines.
              </span>
            </li>
            <li className="flex items-start mb-2">
              <span className="mr-2">⏱️</span>
              <span>
                <strong>Fast Delivery:</strong> Get your food delivered to your
                doorstep in no time.
              </span>
            </li>
            <li className="flex items-start mb-2">
              <span className="mr-2">💳</span>
              <span>
                <strong>Secure Payment:</strong> Enjoy safe and secure payment
                options.
              </span>
            </li>
            <li className="flex items-start mb-2">
              <span className="mr-2">🌟</span>
              <span>
                <strong>User-Friendly Interface:</strong> Navigate easily with
                our intuitive design.
              </span>
            </li>
          </ul>

          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            What Our Users Say
          </h2>
          <div className="mb-6">
            <blockquote className="text-lg italic text-gray-600">
              "This app has changed the way I order food! So convenient and
              fast!"
              <cite className="block mt-2 font-semibold">- Jane D.</cite>
            </blockquote>
            <blockquote className="text-lg italic text-gray-600">
              "A game-changer for my busy lifestyle. Highly recommend!"
              <cite className="block mt-2 font-semibold">- John S.</cite>
            </blockquote>
          </div>

          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Join Us Today!
          </h2>
          <p className="mb-6 text-lg text-gray-700">
            Download our app now and discover a world of flavors at your
            fingertips. Let us bring your favorite meals to you!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
});

export default About;
