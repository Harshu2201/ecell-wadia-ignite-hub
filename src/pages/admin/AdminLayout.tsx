
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/AdminSidebar";
import { useState, useEffect } from "react";

const AdminLayout = () => {
  const { user, loading, isAdmin } = useAuth();
  const [loadingAnimation, setLoadingAnimation] = useState(true);
  
  useEffect(() => {
    if (!loading) {
      // Add a small delay to make the loading animation smoother
      const timeout = setTimeout(() => {
        setLoadingAnimation(false);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [loading]);
  
  // Show loading state
  if (loading || loadingAnimation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <img 
                  src="/lovable-uploads/3a23508b-f321-4592-886c-c1a4c606d96b.png" 
                  alt="E-Cell Logo" 
                  className="w-10 h-10 object-contain bg-white rounded-full"
                />
              </div>
            </div>
            <div className="text-white font-heading text-xl mt-4 animate-pulse">Loading Admin Panel</div>
            <p className="text-gray-400 mt-2">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Redirect if user is not logged in or not an admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-900 min-h-screen animate-fade-in">
        <div className="py-6 px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
