
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Special case for admin login with a hardcoded username instead of email
      if (email === "EcellMESWCOE" && password === "Ecell162024") {
        // Call login with admin email from the mock data
        await login("admin@ecell.com", "admin123");
        navigate("/admin");
        return;
      }

      // Regular login flow
      await login(email, password);
      navigate("/");
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <Link to="/" className="inline-block">
              <div className="flex items-center justify-center mb-2">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary mb-2 mx-auto">
                  <img 
                    src="/lovable-uploads/3a23508b-f321-4592-886c-c1a4c606d96b.png" 
                    alt="E-Cell MESWCOE Logo" 
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
              </div>
              <span className="font-heading text-2xl font-bold text-primary">ECELL</span>
              <span className="font-heading text-2xl text-white ml-1">MESWCOE</span>
            </Link>
            <h1 className="text-3xl font-bold mt-6">Welcome Back</h1>
            <p className="text-gray-400 mt-2">Sign in to your account to continue</p>
          </div>

          <div className="bg-gray-800/60 p-8 rounded-xl border border-gray-700 shadow-2xl animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Username</Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email or username"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
