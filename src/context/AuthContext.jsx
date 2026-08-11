import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import apiClient from "@/lib/apiClient";
import { apiPaths } from "@/lib/productApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await apiClient.get(apiPaths.auth.currentUser);
      if (response?.data?.success && response?.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      // 401 or network error -> treat as unauthenticated without crashing
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post(apiPaths.auth.login, {
        email,
        password,
      });

      const loggedInUser = response?.data?.user || null;
      if (loggedInUser) {
        setUser(loggedInUser);
      }

      return {
        success: true,
        user: loggedInUser,
        message: response?.data?.message || "Login Successful",
      };
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please check your credentials.";

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const signup = async (firstName, lastName, email, password) => {
    try {
      const response = await apiClient.post(apiPaths.auth.signup, {
        firstName,
        lastName,
        email,
        password,
      });

      return {
        success: true,
        message:
          response?.data?.message ||
          "Account created successfully. You can now log in.",
      };
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please check your information and try again.";

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const logout = async () => {
    try {
      await apiClient.post(apiPaths.auth.logout);
    } catch (error) {
      // Silently catch error on logout
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, signup, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
