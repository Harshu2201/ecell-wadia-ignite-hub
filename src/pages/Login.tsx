
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Shield, Lock, Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  
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
        toast.success("Admin login successful");
        navigate("/admin");
        return;
      }

      // Regular login flow
      await login(email, password);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    
    // Simulate password reset email (in a real app, this would call an API)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Password reset link sent! Please check your email.");
      setForgotPasswordOpen(false);
      setResetEmail("");
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setResetLoading(false);
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
              <div className="flex items-center justify-center">
                <Shield size={18} className="mr-1 text-primary" />
                <span className="font-heading text-2xl font-bold text-primary">ECELL</span>
                <span className="font-heading text-2xl text-white ml-1">MESWCOE</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold mt-6">Secure Access Portal</h1>
            <p className="text-gray-400 mt-2">Sign in to your account to continue</p>
          </div>

          <div className="bg-gray-800/80 p-8 rounded-xl border border-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail size={16} className="mr-2 text-primary" />
                  Email or Username
                </Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email or username"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="flex items-center">
                    <Lock size={16} className="mr-2 text-primary" />
                    Password
                  </Label>
                  <button 
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-sm text-primary hover:text-primary/80 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-primary"
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
                    Authenticating...
                  </div>
                ) : (
                  <>
                    <Lock className="mr-2" size={18} />
                    Secure Sign In
                  </>
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
            <p className="mt-1 flex justify-center items-center">
              <Shield size={14} className="mr-1" /> Protected by E-Cell Cybersecurity
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Shield className="mr-2 text-primary" size={18} />
              Reset Password
            </DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleResetPassword}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setForgotPasswordOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={resetLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {resetLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
