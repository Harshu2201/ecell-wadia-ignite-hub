
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-heading text-2xl font-bold text-primary">ECELL</span>
            <span className="font-heading text-xl text-secondary">MESWCOE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link text-secondary font-medium">Home</Link>
            <Link to="/about" className="nav-link text-secondary font-medium">About</Link>
            <Link to="/events" className="nav-link text-secondary font-medium">Events</Link>
            <Link to="/blogs" className="nav-link text-secondary font-medium">Blogs</Link>
            <Link to="/team" className="nav-link text-secondary font-medium">Team</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Button
                    variant="outline"
                    onClick={() => navigate('/admin')}
                    className="text-primary border-primary hover:bg-primary hover:text-white"
                  >
                    Dashboard
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-secondary hover:text-primary"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => navigate('/login')}
                className="bg-primary text-white hover:bg-primary/90"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-secondary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute w-full z-50 shadow-md animate-fade-in">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-3">
            <Link to="/" className="py-2 px-4 text-secondary font-medium" onClick={closeMenu}>Home</Link>
            <Link to="/about" className="py-2 px-4 text-secondary font-medium" onClick={closeMenu}>About</Link>
            <Link to="/events" className="py-2 px-4 text-secondary font-medium" onClick={closeMenu}>Events</Link>
            <Link to="/blogs" className="py-2 px-4 text-secondary font-medium" onClick={closeMenu}>Blogs</Link>
            <Link to="/team" className="py-2 px-4 text-secondary font-medium" onClick={closeMenu}>Team</Link>
            
            {user ? (
              <div className="space-y-2 pt-2">
                {isAdmin && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate('/admin');
                      closeMenu();
                    }}
                    className="w-full text-primary border-primary hover:bg-primary hover:text-white"
                  >
                    Dashboard
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full text-secondary hover:text-primary"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => {
                  navigate('/login');
                  closeMenu();
                }}
                className="w-full bg-primary text-white hover:bg-primary/90 mt-2"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
