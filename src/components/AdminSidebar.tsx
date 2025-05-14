
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
    <div className="h-screen bg-black text-white flex flex-col w-64 fixed left-0 top-0 border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <Link to="/admin" className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary mr-3">
            <img 
              src="/lovable-uploads/3a23508b-f321-4592-886c-c1a4c606d96b.png" 
              alt="E-Cell MESWCOE Logo" 
              className="w-full h-full object-contain bg-white"
            />
          </div>
          <div>
            <span className="font-heading text-2xl font-bold text-primary">ECELL</span>
            <span className="font-heading text-xl text-white ml-1">Admin</span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg text-white/80 hover:bg-gray-800 hover:text-white transition-all ${
                  isActive(item.path) ? "bg-primary/20 text-white border-l-4 border-primary" : ""
                }`}
              >
                <item.icon size={20} className={isActive(item.path) ? "text-primary" : ""} />
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
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
          className="w-full justify-start text-white border-gray-700 hover:bg-gray-800"
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
