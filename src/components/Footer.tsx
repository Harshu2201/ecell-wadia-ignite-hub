
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-heading text-2xl font-bold text-primary">ECELL</span>
              <span className="font-heading text-xl text-white">MESWCOE</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              The Entrepreneurship Cell of Modern Education Society's Wadia College of Engineering is a student-run organization dedicated to fostering entrepreneurship and innovation among students.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:ecell@meswcoe.edu" className="text-gray-300 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-primary transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-300 hover:text-primary transition-colors">Blogs</Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-primary transition-colors">Our Team</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>Modern Education Society's</p>
              <p>Wadia College of Engineering</p>
              <p>19, Late Prin. V. K. Joag Path</p>
              <p>Pune, Maharashtra 411001</p>
              <p className="mt-2">
                <a href="mailto:ecell@meswcoe.edu" className="hover:text-primary transition-colors">
                  ecell@meswcoe.edu
                </a>
              </p>
              <p>
                <a href="tel:+912026162636" className="hover:text-primary transition-colors">
                  +91 20 2616 2636
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} E-Cell, MESWCOE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
