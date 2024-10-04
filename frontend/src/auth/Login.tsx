import React, { useState } from "react";
import axios from "../context/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC<any> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/login", { email, password });
      if (response.status === 200) {
        const token = response.data.token;
        login(token);
        setErrorMessage("");
        navigate('/home');
      }
    } catch (error: any) {
      if (error.response) {
        setErrors(error.response.data.errors || {});
        if(error.status === 404) {
            setErrorMessage(error.response.data.message);
        }
      } else {
        console.error("Login error:", error.message);
        setErrorMessage("Sorry, we could not find the API. Please come back later.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          {errorMessage && (
            <div className="flex items-center justify-center p-4 mb-4 text-red-700 bg-red-100 border-l-4 border-red-400 rounded-md w-96">
              <div className="flex-1">
                <p className="font-medium">{errorMessage}</p>
              </div>
              <button className="ml-4 text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
          )}
          <div className="p-6 bg-white border rounded-lg shadow-md w-96">
            <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.email &&
                  errors.email.map((error, index) => (
                    <p key={index} className="text-red-500">
                      {error}
                    </p>
                  ))}
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />

                {errors.password &&
                  errors.password.map((error, index) => (
                    <p key={index} className="text-red-500">
                      {error}
                    </p>
                  ))}
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-full px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
