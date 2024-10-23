import React, { useEffect, useState } from "react";
import axios from "../context/api";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

const SuccessLogin: React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    document.title = "Ordering App | Success Login";

    const fetchSuccessLogin = async () => {
      try {
        const response = await axios.get(`/success-login/${token}`);

        if (response.status === 200) {
          Cookies.set("APP-TOKEN", token || "");
          setSuccessMessage(response.data.message);
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          setErrorMessage(error.response.data.message);
        } else {
          console.error("Error:", error.message);
        }
      } finally {
        startCountdown();
        setLoading(false);
      }
    };

    const startCountdown = () => {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = successMessage ? "/home" : "/login";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    };

    fetchSuccessLogin();
  }, [token, successMessage]);

  if(loading || authLoading)
  {
    return <LoadingSpinner />
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 border-gray-500">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
          {successMessage ? (
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
          ) : (
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9l-5-5a1 1 0 10-1.414 1.414L8.586 10 3.586 15.414A1 1 0 001 16.828l5-5 5 5a1 1 0 001.414-1.414L11.414 10l5-5a1 1 0 10-1.414-1.414l-5 5z"
                clipRule="evenodd"
              />
            </svg>
          )}

          <span className="sr-only">
            {successMessage ? "Success" : "Error"}
          </span>
        </div>
        <p className="mb-2 text-lg font-semibold text-center text-gray-900">
          {successMessage ? successMessage : errorMessage}
        </p>
        <p className="mb-4 text-sm text-center text-gray-600">
          {successMessage
            ? `Redirecting to home in ${countdown} seconds...`
            : `Redirecting to login in ${countdown} seconds...`}
        </p>
        {successMessage ? (
          <button
            onClick={() => (window.location.href = "/home")}
            type="button"
            className="w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Go to Home
          </button>
        ) : (
          <button
            onClick={() => (window.location.href = "/login")}
            type="button"
            className="w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessLogin;
