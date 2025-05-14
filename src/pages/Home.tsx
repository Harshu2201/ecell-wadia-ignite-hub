
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { ArrowRight, Calendar, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const { events, blogPosts, achievements } = useData();
  
  // Get only upcoming events
  const upcomingEvents = events.filter(event => !event.isPast).slice(0, 2);
  
  // Get the latest blog posts
  const latestBlogs = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              <span className="text-secondary">Ignite Your</span>
              <span className="text-primary"> Entrepreneurial Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Discover innovation, entrepreneurship, and leadership opportunities with E-Cell MESWCOE. Join our community of aspiring entrepreneurs and change-makers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button className="bg-primary hover:bg-primary/90 text-white" size="lg" asChild>
                <Link to="/events">Explore Events</Link>
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center card-hover animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Engaging Events</h3>
              <p className="text-gray-600">
                From workshops to competitions, we organize events that inspire and educate.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center card-hover animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Startup Support</h3>
              <p className="text-gray-600">
                Get mentorship, resources, and networking opportunities to launch your startup.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center card-hover animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600">
                Join a thriving community of like-minded individuals passionate about innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-secondary">Upcoming Events</h2>
            <Link to="/events" className="flex items-center text-primary hover:underline mt-4 md:mt-0">
              View All Events <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden card-hover">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })} | {event.location}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
                      <Link to={`/events/${event.id}`}>Register Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500">No upcoming events at the moment. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-secondary">Latest Insights</h2>
            <Link to="/blogs" className="flex items-center text-primary hover:underline mt-4 md:mt-0">
              View All Blogs <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden card-hover">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-primary mb-2">{blog.category}</div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">By {blog.author}</span>
                    <Button variant="ghost" className="text-primary hover:text-primary/90 p-0" asChild>
                      <Link to={`/blogs/${blog.id}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-secondary mb-10">Our Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white p-6 rounded-lg shadow-sm card-hover">
                {achievement.image && (
                  <div className="mb-4 h-48 overflow-hidden rounded-md">
                    <img 
                      src={achievement.image} 
                      alt={achievement.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                )}
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-3">
                  {achievement.year}
                </div>
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Begin Your Entrepreneurial Journey?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join the E-Cell community today and get access to exclusive resources, events, and networking opportunities.
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100" size="lg" asChild>
            <Link to="/login">Join Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
