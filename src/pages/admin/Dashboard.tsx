
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Users, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { events, blogPosts, teamMembers } = useData();
  
  const upcomingEvents = events.filter(event => !event.isPast);
  const pastEvents = events.filter(event => event.isPast);
  
  // Calculate total registrations across all events
  const totalRegistrations = events.reduce((total, event) => total + (event.registrations || 0), 0);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.name}!</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              {upcomingEvents.length} upcoming, {pastEvents.length} past
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Blogs</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPosts.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Team Members</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Registrations</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrations}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blogs</CardTitle>
            <CardDescription>Latest blog posts on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts.slice(0, 5).map(blog => (
                <div key={blog.id} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <Link to={`/admin/blogs/edit/${blog.id}`}>
                      <h4 className="text-sm font-medium line-clamp-1 hover:text-primary">{blog.title}</h4>
                    </Link>
                    <p className="text-xs text-gray-500">
                      By {blog.author} on {new Date(blog.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {blogPosts.length === 0 && (
                <p className="text-sm text-gray-500">No blog posts yet.</p>
              )}
              
              <div className="pt-2">
                <Link to="/admin/blogs" className="text-sm text-primary hover:underline">
                  View all blogs
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events that are scheduled in the future</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.slice(0, 5).map(event => (
                <div key={event.id} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <Link to={`/admin/events/edit/${event.id}`}>
                      <h4 className="text-sm font-medium line-clamp-1 hover:text-primary">{event.title}</h4>
                    </Link>
                    <p className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleDateString()} - {event.location}
                    </p>
                  </div>
                </div>
              ))}
              
              {upcomingEvents.length === 0 && (
                <p className="text-sm text-gray-500">No upcoming events.</p>
              )}
              
              <div className="pt-2">
                <Link to="/admin/events" className="text-sm text-primary hover:underline">
                  View all events
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
