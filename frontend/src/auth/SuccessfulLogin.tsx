import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuccessLogin: React.FC = () => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    document.title = "Ordering App | Success Login";
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      Cookies.set("APP-TOKEN", token);
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/home";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 border-gray-500">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Success</span>
        </div>
        <p className="mb-2 text-lg font-semibold text-gray-900">
          Successfully logging in with Google.
        </p>
        <p className="mb-4 text-sm text-gray-600">
          Redirecting to home in {countdown} seconds...
        </p>
        <button
          onClick={() => (window.location.href = "/home")}
          type="button"
          className="w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessLogin;
