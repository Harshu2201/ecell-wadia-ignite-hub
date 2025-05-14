
import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Linkedin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Team = () => {
  const { teamMembers } = useData();
  const [activeTab, setActiveTab] = useState("2024-25");
  
  const teamMembers2024 = teamMembers.filter(member => member.year === "2024-25");
  const teamMembers2025 = teamMembers.filter(member => member.year === "2025-26");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">Our Team</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated individuals behind E-Cell MESWCOE who work tirelessly to foster entrepreneurship and innovation.
          </p>
        </div>

        <Tabs defaultValue="2024-25" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger 
              value="2024-25" 
              onClick={() => setActiveTab("2024-25")}
              className={activeTab === "2024-25" ? "bg-primary text-white data-[state=active]:bg-primary data-[state=active]:text-white" : ""}
            >
              2024-25 Team
            </TabsTrigger>
            <TabsTrigger 
              value="2025-26" 
              onClick={() => setActiveTab("2025-26")}
              className={activeTab === "2025-26" ? "bg-primary text-white data-[state=active]:bg-primary data-[state=active]:text-white" : ""}
            >
              2025-26 Team
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="2024-25" className="animate-fade-in">
            {teamMembers2024.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {teamMembers2024.map(member => (
                  <div 
                    key={member.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden card-hover"
                  >
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-secondary">{member.name}</h3>
                      <p className="text-primary mb-4">{member.role}</p>
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-600 hover:text-primary"
                      >
                        <Linkedin size={18} className="mr-1" /> LinkedIn
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No team members found</h3>
                <p className="text-gray-500">
                  There are no team members for 2024-25 to display.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="2025-26" className="animate-fade-in">
            {teamMembers2025.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {teamMembers2025.map(member => (
                  <div 
                    key={member.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden card-hover"
                  >
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-secondary">{member.name}</h3>
                      <p className="text-primary mb-4">{member.role}</p>
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-600 hover:text-primary"
                      >
                        <Linkedin size={18} className="mr-1" /> LinkedIn
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No team members found</h3>
                <p className="text-gray-500">
                  There are no team members for 2025-26 to display.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Team;
