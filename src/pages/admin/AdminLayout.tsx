
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/AdminSidebar";

const AdminLayout = () => {
  const { user, loading, isAdmin } = useAuth();
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Redirect if user is not logged in or not an admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <div className="py-6 px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
