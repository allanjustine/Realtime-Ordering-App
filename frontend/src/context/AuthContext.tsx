import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../context/api";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("APP-TOKEN");
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    const token = Cookies.get("APP-TOKEN");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get("/profile");
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (token: string) => {
    Cookies.set("APP-TOKEN", token);
    setIsAuthenticated(true);
    fetchUserProfile();
  };

  const logout = async () => {
    try {
      const response = await axios.post("/logout");

      if (response.status === 200) {
        Cookies.remove("APP-TOKEN");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error: any) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, user, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
