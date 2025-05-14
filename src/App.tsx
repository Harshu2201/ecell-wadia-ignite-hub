
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";

// Layout and common components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Public pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Blogs from "@/pages/Blogs";
import BlogDetail from "@/pages/BlogDetail";
import Team from "@/pages/Team";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";

// Admin pages
import AdminLayout from "@/pages/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import BlogsManagement from "@/pages/admin/BlogsManagement";
import BlogForm from "@/pages/admin/BlogForm";
import EventsManagement from "@/pages/admin/EventsManagement";
import EventForm from "@/pages/admin/EventForm";
import TeamManagement from "@/pages/admin/TeamManagement";
import TeamMemberForm from "@/pages/admin/TeamMemberForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route 
                path="/" 
                element={
                  <>
                    <Navbar />
                    <Home />
                    <Footer />
                  </>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <>
                    <Navbar />
                    <About />
                    <Footer />
                  </>
                } 
              />
              <Route 
                path="/events" 
                element={
                  <>
                    <Navbar />
                    <Events />
                    <Footer />
                  </>
                } 
              />
              <Route 
                path="/events/:id" 
                element={
                  <>
                    <Navbar />
                    <EventDetail />
                    <Footer />
                  </>
                } 
              />
              <Route 
                path="/blogs" 
                element={
                  <>
                    <Navbar />
                    <Blogs />
                    <Footer />
                  </>
                } 
              />
              <Route 
                path="/blogs/:id" 
                element={
                  <>
                    <Navbar />
                    <BlogDetail />
                    <Footer />
                  </>
                } 
              />
              <Route 
                path="/team" 
                element={
                  <>
                    <Navbar />
                    <Team />
                    <Footer />
                  </>
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="blogs" element={<BlogsManagement />} />
                <Route path="blogs/create" element={<BlogForm />} />
                <Route path="blogs/edit/:id" element={<BlogForm />} />
                <Route path="events" element={<EventsManagement />} />
                <Route path="events/create" element={<EventForm />} />
                <Route path="events/edit/:id" element={<EventForm />} />
                <Route path="team" element={<TeamManagement />} />
                <Route path="team/create" element={<TeamMemberForm />} />
                <Route path="team/edit/:id" element={<TeamMemberForm />} />
              </Route>

              {/* Catch-all route for 404 */}
              <Route 
                path="*" 
                element={
                  <>
                    <Navbar />
                    <NotFound />
                    <Footer />
                  </>
                } 
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
