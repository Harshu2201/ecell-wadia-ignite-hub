
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { ArrowRight, Calendar, TrendingUp, Users, Lightbulb, ChevronRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const { events, blogPosts, achievements } = useData();
  const [animatedItems, setAnimatedItems] = useState<string[]>([]);
  
  // Get only upcoming events
  const upcomingEvents = events.filter(event => !event.isPast).slice(0, 2);
  
  // Get the latest blog posts
  const latestBlogs = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3);

  // Handle animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id && !animatedItems.includes(id)) {
              setAnimatedItems(prev => [...prev, id]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-id]').forEach(item => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, [animatedItems]);

  const isAnimated = (id: string) => animatedItems.includes(id);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-secondary via-secondary to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              <span className="text-white">Ignite Your</span>
              <span className="text-primary"> Entrepreneurial Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Discover innovation, entrepreneurship, and leadership opportunities with E-Cell MESWCOE. Join our community of aspiring entrepreneurs and change-makers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button className="bg-primary hover:bg-primary/90 text-white hover:scale-105 transition-transform" size="lg" asChild>
                <Link to="/events">Explore Events</Link>
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white hover:scale-105 transition-transform" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              data-id="feature-1"
              className={`bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl text-center transform transition-all duration-500 hover:scale-105 border border-gray-700 shadow-xl ${
                isAnimated("feature-1") ? 'animate-fade-in' : 'opacity-0'
              }`}
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Engaging Events</h3>
              <p className="text-gray-300">
                From workshops to competitions, we organize events that inspire and educate budding entrepreneurs.
              </p>
            </div>
            
            <div 
              data-id="feature-2"
              className={`bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl text-center transform transition-all duration-500 hover:scale-105 border border-gray-700 shadow-xl ${
                isAnimated("feature-2") ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Startup Support</h3>
              <p className="text-gray-300">
                Get mentorship, resources, and networking opportunities to launch your startup.
              </p>
            </div>
            
            <div 
              data-id="feature-3"
              className={`bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl text-center transform transition-all duration-500 hover:scale-105 border border-gray-700 shadow-xl ${
                isAnimated("feature-3") ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Community</h3>
              <p className="text-gray-300">
                Join a thriving community of like-minded individuals passionate about innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="text-4xl font-heading font-bold text-white mb-6 leading-tight">
              "The best way to predict the future is to <span className="text-primary">create</span> it."
            </div>
            <div className="text-xl text-gray-300">- Peter Drucker</div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
            <Link to="/events" className="flex items-center text-primary hover:underline mt-4 md:mt-0 group">
              View All Events <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <Card 
                  key={event.id}
                  data-id={`event-${event.id}`}
                  className={`overflow-hidden bg-black border-gray-800 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30 ${
                    isAnimated(`event-${event.id}`) ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                    />
                  </div>
                  <CardContent className="p-6 bg-gradient-to-b from-gray-900 to-black">
                    <div className="text-sm text-gray-400 mb-2">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })} | {event.location}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                    <Button className="bg-primary hover:bg-primary/90 text-white hover:scale-105 transition-transform" asChild>
                      <Link to={`/events/${event.id}`}>Register Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-gray-400">No upcoming events at the moment. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Entrepreneurship */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-10">Why Entrepreneurship?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div 
              data-id="why-entrepreneurship-1"
              className={`${
                isAnimated("why-entrepreneurship-1") ? 'animate-fade-in' : 'opacity-0'
              }`}
            >
              <ul className="space-y-4">
                <li className="flex items-start bg-gray-800/50 p-4 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                    <ChevronRight className="text-primary" size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Create Impact</h3>
                    <p className="text-gray-300">Entrepreneurs solve real-world problems and create positive change in society.</p>
                  </div>
                </li>
                <li className="flex items-start bg-gray-800/50 p-4 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                    <ChevronRight className="text-primary" size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Financial Freedom</h3>
                    <p className="text-gray-300">Build wealth and achieve financial independence by creating your own ventures.</p>
                  </div>
                </li>
                <li className="flex items-start bg-gray-800/50 p-4 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                    <ChevronRight className="text-primary" size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Creativity and Innovation</h3>
                    <p className="text-gray-300">Express your creativity and implement innovative ideas without limitations.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div 
              data-id="why-entrepreneurship-2"
              className={`${
                isAnimated("why-entrepreneurship-2") ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <ul className="space-y-4">
                <li className="flex items-start bg-gray-800/50 p-4 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                    <ChevronRight className="text-primary" size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Skill Development</h3>
                    <p className="text-gray-300">Develop a diverse range of skills from leadership to problem-solving and communication.</p>
                  </div>
                </li>
                <li className="flex items-start bg-gray-800/50 p-4 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                    <ChevronRight className="text-primary" size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Be Your Own Boss</h3>
                    <p className="text-gray-300">Enjoy the freedom to make your own decisions and create your own work culture.</p>
                  </div>
                </li>
                <li className="flex items-start bg-gray-800/50 p-4 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                    <ChevronRight className="text-primary" size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Network Building</h3>
                    <p className="text-gray-300">Connect with like-minded individuals, mentors, and investors who can help you grow.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 bg-gradient-to-br from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white">Latest Insights</h2>
            <Link to="/blogs" className="flex items-center text-primary hover:underline mt-4 md:mt-0 group">
              View All Blogs <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((blog, index) => (
              <Card 
                key={blog.id}
                data-id={`blog-${blog.id}`}
                className={`overflow-hidden bg-black border-gray-800 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30 ${
                  isAnimated(`blog-${blog.id}`) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                  />
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-gray-900 to-black">
                  <div className="text-sm text-primary mb-2">{blog.category}</div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 text-white">{blog.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">By {blog.author}</span>
                    <Button variant="ghost" className="text-primary hover:text-primary/90 p-0 group" asChild>
                      <Link to={`/blogs/${blog.id}`}>
                        Read More <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-10">Our Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.id}
                data-id={`achievement-${achievement.id}`}
                className={`bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-gray-700 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30 ${
                  isAnimated(`achievement-${achievement.id}`) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                {achievement.image && (
                  <div className="mb-4 h-48 overflow-hidden rounded-md">
                    <img 
                      src={achievement.image} 
                      alt={achievement.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                  </div>
                )}
                <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm mb-3">
                  {achievement.year}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{achievement.title}</h3>
                <p className="text-gray-300">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Begin Your Entrepreneurial Journey?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join the E-Cell community today and get access to exclusive resources, events, and networking opportunities.
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-transform" size="lg" asChild>
            <Link to="/login">Join Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
