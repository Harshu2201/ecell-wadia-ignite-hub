
import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Users } from "lucide-react";

const Events = () => {
  const { events } = useData();
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const upcomingEvents = events.filter(event => !event.isPast);
  const pastEvents = events.filter(event => event.isPast);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">Events</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our exciting events designed to inspire innovation, foster entrepreneurship, and build a community of future leaders.
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger 
              value="upcoming" 
              onClick={() => setActiveTab("upcoming")}
              className={activeTab === "upcoming" ? "bg-primary text-white data-[state=active]:bg-primary data-[state=active]:text-white" : ""}
            >
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              onClick={() => setActiveTab("past")}
              className={activeTab === "past" ? "bg-primary text-white data-[state=active]:bg-primary data-[state=active]:text-white" : ""}
            >
              Past Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="animate-fade-in">
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {upcomingEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden card-hover">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="h-full">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6 col-span-2">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <h3 className="text-2xl font-bold mb-2 text-secondary">{event.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center">
                                <Calendar size={16} className="mr-1 text-primary" />
                                {new Date(event.date).toLocaleDateString('en-US', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </div>
                              <div className="flex items-center">
                                <MapPin size={16} className="mr-1 text-primary" />
                                {event.location}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-4 items-center">
                            <Button className="bg-primary hover:bg-primary/90" asChild>
                              <Link to={`/events/${event.id}`}>Register Now</Link>
                            </Button>
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
                              <Link to={`/events/${event.id}`}>Learn More</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No upcoming events</h3>
                <p className="text-gray-500 mb-4">
                  We don't have any upcoming events scheduled at the moment. Check back later!
                </p>
                <Button className="bg-primary hover:bg-primary/90" asChild>
                  <Link to="/events?tab=past">View Past Events</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="animate-fade-in">
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {pastEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden card-hover">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="h-full">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6 col-span-2">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <h3 className="text-2xl font-bold mb-2 text-secondary">{event.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center">
                                <Calendar size={16} className="mr-1 text-primary" />
                                {new Date(event.date).toLocaleDateString('en-US', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </div>
                              <div className="flex items-center">
                                <MapPin size={16} className="mr-1 text-primary" />
                                {event.location}
                              </div>
                              {event.registrations && (
                                <div className="flex items-center">
                                  <Users size={16} className="mr-1 text-primary" />
                                  {event.registrations} Attendees
                                </div>
                              )}
                            </div>
                            <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
                          </div>
                          <div>
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
                              <Link to={`/events/${event.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No past events</h3>
                <p className="text-gray-500">
                  There are no past events to display.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;
