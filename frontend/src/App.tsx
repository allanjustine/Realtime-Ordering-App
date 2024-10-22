import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";
import ProductDetail from "./products/ProductDetail";
import AOS from "aos";
import "aos/dist/aos.css";
import SuccessLogin from "./auth/SuccessfulLogin";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Navbar = lazy(() => import("./components/Navbar"));
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const Product = lazy(() => import("./products/Product"));
const Cart = lazy(() => import("./carts/Cart"));

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return isAuthenticated ? children : <Navigate to="/login" />;
};
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/home" />;
};

const App: React.FC = () => {
  const [onSubmit, setOnSubmit] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Navbar onSubmit={onSubmit} />
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/food-products"
              element={
                <ProtectedRoute>
                  <Product setOnSubmit={setOnSubmit} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product-detail/:id"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/carts"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success-login/?token=:{token}"
              element={
                <PublicRoute>
                  <SuccessLogin />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login to="/login" />
                </PublicRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
