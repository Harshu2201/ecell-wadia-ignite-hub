
import { Link, useLocation } from "react-router-dom";
import { Calendar, FileText, Home, LayoutDashboard, LogOut, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin",
    },
    {
      icon: Calendar,
      label: "Events",
      path: "/admin/events",
    },
    {
      icon: FileText,
      label: "Blogs",
      path: "/admin/blogs",
    },
    {
      icon: Users,
      label: "Team",
      path: "/admin/team",
    },
  ];

  return (
    <div className="h-screen bg-secondary text-white flex flex-col w-64 fixed left-0 top-0">
      <div className="p-6 border-b border-gray-700">
        <Link to="/admin" className="flex items-center">
          <span className="font-heading text-2xl font-bold text-primary">ECELL</span>
          <span className="font-heading text-xl text-white ml-2">Admin</span>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-white/80 hover:bg-gray-700 hover:text-white ${
                  isActive(item.path) ? "bg-gray-700 text-white" : ""
                }`}
              >
                <item.icon size={20} className={isActive(item.path) ? "text-primary" : ""} />
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <Link
            to="/"
            className="flex items-center text-white/80 hover:text-white"
          >
            <Home size={20} />
            <span className="ml-3">Website</span>
          </Link>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start text-white border-gray-600 hover:bg-gray-700"
          onClick={logout}
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
