import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-20 font-dmSans">
        <Loader2 className="h-10 w-10 animate-spin text-menuHeading dark:text-white mb-4" />
        <p className="text-base text-header font-medium">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-20 font-dmSans">
        <Loader2 className="h-10 w-10 animate-spin text-menuHeading dark:text-white mb-4" />
        <p className="text-base text-header font-medium">Loading...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/account" replace />;
  }

  return children;
};

export default ProtectedRoute;
