import React, { useState } from "react";
import axios from "../context/api";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../modals/SuccessModal";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        setErrors({});
        setName("");
        setPassword("");
        setPasswordConfirmation("");
        setEmail("");
        setMessage(response.data.message);
        setIsModalOpen(true);
      }
    } catch (error: any) {
      if (error.response) {
        setErrors(error.response.data.errors || {});
      } else {
        console.error("Registration error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white border rounded-lg shadow-md w-96">
        <h2 className="mb-4 text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.name &&
              errors.name.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
          </div>
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
          <div className="mb-4">
            <label
              className="block mb-2 text-gray-700"
              htmlFor="password_confirmation"
            >
              Password Confirmation
            </label>
            <input
              type="password"
              id="password_confirmation"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.password_confirmation &&
              errors.password_confirmation.map((error, index) => (
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
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
      <SuccessModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={message}
      />
    </div>
  );
};

export default Register;
