
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Award, Users, Calendar, TrendingUp, BookOpen, Lightbulb } from "lucide-react";

const About = () => {
  const { achievements } = useData();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              <span className="text-secondary">About </span>
              <span className="text-primary">E-Cell MESWCOE</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              The Entrepreneurship Cell of Modern Education Society's Wadia College of Engineering is a student-run organization dedicated to fostering entrepreneurship and innovation among students.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-3xl font-bold text-secondary mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                To create, foster and promote entrepreneurship among students by providing resources, guidance, and networking opportunities, turning innovative ideas into successful ventures.
              </p>
              <p className="text-gray-700">
                We strive to build an ecosystem that encourages students to think beyond conventional career paths and explore entrepreneurship as a viable option, contributing to economic growth and job creation.
              </p>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl font-bold text-secondary mb-6">Our Vision</h2>
              <p className="text-gray-700 mb-4">
                To be recognized as the leading entrepreneurship cell among engineering colleges in India, nurturing the next generation of innovators and entrepreneurs who drive positive change in society.
              </p>
              <p className="text-gray-700">
                We envision creating a vibrant community of student entrepreneurs who collaborate, innovate, and lead the way in addressing real-world challenges through sustainable business solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary text-center mb-12">What We Do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center card-hover animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Events & Workshops</h3>
              <p className="text-gray-600">
                We organize various events, workshops, and competitions to inspire and educate students about entrepreneurship and innovation.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center card-hover animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mentorship</h3>
              <p className="text-gray-600">
                We connect students with industry experts and successful entrepreneurs who provide guidance and support for their startup ideas.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center card-hover animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Incubation Support</h3>
              <p className="text-gray-600">
                We help students incubate their startup ideas by providing resources, networking opportunities, and access to funding options.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center card-hover animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Knowledge Sharing</h3>
              <p className="text-gray-600">
                We create and share valuable content about entrepreneurship, innovation, and startup fundamentals through blogs and newsletters.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center card-hover animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Networking</h3>
              <p className="text-gray-600">
                We facilitate networking opportunities between students, alumni, industry professionals, and investors to build a strong entrepreneurial community.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center card-hover animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Recognition</h3>
              <p className="text-gray-600">
                We recognize and celebrate student achievements in entrepreneurship and innovation, motivating others to follow their footsteps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary text-center mb-12">Our Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.id} 
                className="bg-gray-50 p-6 rounded-lg shadow-sm card-hover animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
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

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Whether you have a startup idea or just want to learn more about entrepreneurship, we welcome you to be part of our vibrant community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-gray-100" size="lg" asChild>
              <Link to="/signup">Join Us Today</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10" size="lg" asChild>
              <Link to="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
