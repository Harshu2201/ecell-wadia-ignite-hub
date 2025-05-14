
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Award, Users, Calendar, TrendingUp, BookOpen, Lightbulb, ChevronRight, Rocket, Target, Smile } from "lucide-react";

const About = () => {
  const { achievements } = useData();
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-secondary via-secondary to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              <span className="text-white">About </span>
              <span className="text-primary">E-Cell MESWCOE</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              The Entrepreneurship Cell of Modern Education Society's Wadia College of Engineering is a student-run organization dedicated to fostering entrepreneurship and innovation among students.
            </p>
          </div>
        </div>
      </section>

      {/* About E-Cell MESWCOE */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700 animate-scale-in">
              <h2 className="text-3xl font-bold text-primary mb-6">Who We Are</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                E-Cell MESWCOE was founded with the vision of creating a vibrant ecosystem that promotes entrepreneurship and innovation within the college. We believe that entrepreneurship is not just about starting businesses, but about fostering a mindset that values creativity, problem-solving, and resilience.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Our cell was established in 2015 and has since grown into one of the most active student bodies at MESWCOE. We are recognized by the Maharashtra State Entrepreneurship Development Cell and have collaborated with various organizations including TiE Pune, CIIE, and EDII.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Through our various initiatives, workshops, seminars, and competitions, we aim to provide students with the knowledge, skills, and network they need to pursue their entrepreneurial dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-black/60 p-8 rounded-xl border border-gray-800 transform transition-all duration-500 hover:border-primary/30 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center mb-6">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <Target className="text-primary" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                To create, foster and promote entrepreneurship among students by providing resources, guidance, and networking opportunities, turning innovative ideas into successful ventures.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We strive to build an ecosystem that encourages students to think beyond conventional career paths and explore entrepreneurship as a viable option, contributing to economic growth and job creation.
              </p>
            </div>
            
            <div className="bg-black/60 p-8 rounded-xl border border-gray-800 transform transition-all duration-500 hover:border-primary/30 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center mb-6">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <Rocket className="text-primary" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                To be recognized as the leading entrepreneurship cell among engineering colleges in India, nurturing the next generation of innovators and entrepreneurs who drive positive change in society.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We envision creating a vibrant community of student entrepreneurs who collaborate, innovate, and lead the way in addressing real-world challenges through sustainable business solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-4">What We Do</h2>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            At E-Cell MESWCOE, we engage in a variety of activities to promote entrepreneurship and innovation among students.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-700 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Events & Workshops</h3>
              <p className="text-gray-300">
                We organize various events, workshops, and competitions to inspire and educate students about entrepreneurship and innovation. Our events include business plan competitions, startup weekends, and hackathons.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-700 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Mentorship</h3>
              <p className="text-gray-300">
                We connect students with industry experts and successful entrepreneurs who provide guidance and support for their startup ideas. Our mentorship programs include one-on-one sessions, group mentoring, and panel discussions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-700 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Incubation Support</h3>
              <p className="text-gray-300">
                We help students incubate their startup ideas by providing resources, networking opportunities, and access to funding options. Our incubation support includes workspace, technical resources, and connections to potential investors.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-700 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Knowledge Sharing</h3>
              <p className="text-gray-300">
                We create and share valuable content about entrepreneurship, innovation, and startup fundamentals through blogs, newsletters, and social media. Our knowledge sharing initiatives include case studies, success stories, and practical guides.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-700 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Networking</h3>
              <p className="text-gray-300">
                We facilitate networking opportunities between students, alumni, industry professionals, and investors to build a strong entrepreneurial community. Our networking events include mixers, conferences, and industry visits.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-700 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smile size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Recognition</h3>
              <p className="text-gray-300">
                We recognize and celebrate student achievements in entrepreneurship and innovation, motivating others to follow their footsteps. Our recognition programs include awards, certificates, and public acknowledgment of student accomplishments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Our Achievements</h2>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Over the years, E-Cell MESWCOE has achieved significant milestones and made a positive impact on the entrepreneurial ecosystem.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.id} 
                className="bg-black/60 p-6 rounded-xl shadow-xl border border-gray-700 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {achievement.image && (
                  <div className="mb-4 h-48 overflow-hidden rounded-md">
                    <img 
                      src={achievement.image} 
                      alt={achievement.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
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

      {/* Community Programs */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Community Programs</h2>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            We believe in giving back to the community and making a positive impact through various programs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border border-gray-700 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-2xl font-bold mb-4 text-white">Social Entrepreneurship Initiatives</h3>
              <p className="text-gray-300 mb-4">
                We encourage and support social entrepreneurship projects that address pressing social issues and contribute to sustainable development. Our social entrepreneurship initiatives focus on areas such as education, healthcare, environment, and rural development.
              </p>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>Social Impact Hackathons</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>SDG-aligned Startup Competitions</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>Community Outreach Programs</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border border-gray-700 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-2xl font-bold mb-4 text-white">Skill Development Programs</h3>
              <p className="text-gray-300 mb-4">
                We organize skill development programs to equip students with practical skills that are essential for entrepreneurial success. These programs cover a wide range of topics including design thinking, digital marketing, financial management, and leadership.
              </p>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>Bootcamps and Workshops</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>Masterclasses by Industry Experts</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>Hands-on Project-based Learning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Whether you have a startup idea or just want to learn more about entrepreneurship, we welcome you to be part of our vibrant community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-transform" size="lg" asChild>
              <Link to="/signup">Join Us Today</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 hover:scale-105 transition-transform" size="lg" asChild>
              <Link to="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
