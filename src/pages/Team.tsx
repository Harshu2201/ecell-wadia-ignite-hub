
import { useEffect, useState } from "react";
import { useData } from "@/context/DataContext";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Team = () => {
  const { teamMembers } = useData();
  const [year, setYear] = useState("2024-25");
  const [animatedMembers, setAnimatedMembers] = useState<string[]>([]);

  const filteredMembers = teamMembers.filter(member => member.year === year);

  // Group members by role
  const teamLeads = filteredMembers.filter(member => member.role === "Lead" || member.role === "President" || member.role === "Vice President");
  const coreCommittee = filteredMembers.filter(member => member.role === "Core Team" || member.role.includes("Head") || member.role.includes("Lead"));
  const volunteers = filteredMembers.filter(member => member.role === "Member" || member.role === "Volunteer" || member.role === "Secretary");

  // Handle animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id && !animatedMembers.includes(id)) {
              setAnimatedMembers(prev => [...prev, id]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.team-member-card').forEach(card => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, [year, animatedMembers]);

  const isAnimated = (id: string) => animatedMembers.includes(id);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-secondary via-secondary to-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-in">
            Meet Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            The E-Cell MESWCOE team comprises passionate individuals committed to fostering the entrepreneurial spirit within our campus and beyond.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-secondary">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="2024-25" className="w-full max-w-md mx-auto mb-10">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger 
                value="2024-25" 
                onClick={() => setYear("2024-25")}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                2024–25
              </TabsTrigger>
              <TabsTrigger 
                value="2025-26" 
                onClick={() => setYear("2025-26")}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                2025–26
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Leadership Team */}
          {teamLeads.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-white mb-12 relative">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Leadership Team
                </span>
                <span className="block w-24 h-1 bg-primary mx-auto mt-4"></span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamLeads.map((member) => (
                  <div 
                    key={member.id}
                    data-id={member.id}
                    className={`team-member-card relative bg-black/60 rounded-lg overflow-hidden shadow-xl border border-gray-800 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30 ${
                      isAnimated(member.id) ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.1 * (parseInt(member.id) % 10)}s` }}
                  >
                    <div className="h-[250px] overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-2 rounded-full text-white hover:scale-110 transition-transform">
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                    <div className="p-6 bg-gradient-to-b from-black/80 to-black">
                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                      <div className="inline-block px-3 py-1 bg-primary/20 rounded-full text-primary text-sm mb-3">
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Committee */}
          {coreCommittee.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-white mb-12 relative">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Core Committee
                </span>
                <span className="block w-24 h-1 bg-primary mx-auto mt-4"></span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {coreCommittee.map((member) => (
                  <div 
                    key={member.id}
                    data-id={member.id}
                    className={`team-member-card bg-black/60 rounded-lg overflow-hidden shadow-lg border border-gray-800 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-primary/30 ${
                      isAnimated(member.id) ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.1 * (parseInt(member.id) % 10)}s` }}
                  >
                    <div className="h-[200px] overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-2 rounded-full text-white hover:scale-110 transition-transform">
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                    <div className="p-4 bg-gradient-to-b from-black/80 to-black">
                      <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                      <div className="inline-block px-2 py-1 bg-primary/20 rounded-full text-primary text-xs mb-2">
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Volunteers / Members */}
          {volunteers.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-center text-white mb-12 relative">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Team Members
                </span>
                <span className="block w-24 h-1 bg-primary mx-auto mt-4"></span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {volunteers.map((member) => (
                  <div 
                    key={member.id}
                    data-id={member.id}
                    className={`team-member-card bg-black/60 rounded-lg overflow-hidden shadow-md border border-gray-800 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-primary/30 ${
                      isAnimated(member.id) ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.1 * (parseInt(member.id) % 10)}s` }}
                  >
                    <div className="h-36 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-1.5 rounded-full text-white hover:scale-110 transition-transform">
                          <Linkedin size={14} />
                        </a>
                      )}
                    </div>
                    <div className="p-3 bg-gradient-to-b from-black/80 to-black">
                      <h3 className="text-base font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-gray-300 text-xs">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredMembers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400">Team information for {year} will be updated soon.</p>
            </div>
          )}

          {/* Join the Team CTA */}
          <div className="mt-20 text-center bg-gradient-to-r from-primary/20 to-secondary p-10 rounded-xl">
            <h2 className="text-3xl font-bold text-white mb-4">Want to Join Our Team?</h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-8">
              We're always looking for passionate students who want to contribute to the entrepreneurial ecosystem at MESWCOE. Join us and be part of something extraordinary!
            </p>
            <Button className="bg-primary hover:bg-primary/80 text-white" size="lg">
              Apply to Join
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
