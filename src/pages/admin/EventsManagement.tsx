
import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EventsManagement = () => {
  const { events, deleteEvent } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const upcomingEvents = events.filter(event => !event.isPast);
  const pastEvents = events.filter(event => event.isPast);
  
  let filteredEvents = events;
  
  if (activeTab === "upcoming") {
    filteredEvents = upcomingEvents;
  } else if (activeTab === "past") {
    filteredEvents = pastEvents;
  }
  
  filteredEvents = filteredEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">Events Management</h1>
          <p className="text-gray-500">Manage all events from here</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" asChild>
          <Link to="/admin/events/create">
            <Plus size={18} className="mr-2" /> Add New Event
          </Link>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger 
                value="all" 
                onClick={() => setActiveTab("all")}
                className={activeTab === "all" ? "bg-primary text-white data-[state=active]:bg-primary data-[state=active]:text-white" : ""}
              >
                All Events
              </TabsTrigger>
              <TabsTrigger 
                value="upcoming" 
                onClick={() => setActiveTab("upcoming")}
                className={activeTab === "upcoming" ? "bg-primary text-white data-[state=active]:bg-primary data-[state=active]:text-white" : ""}
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="past" 
                onClick={() => setActiveTab("past")}
                className={activeTab === "past" ? "bg-primary text-white data-[state=active]:bg-primary data-[state=active]:text-white" : ""}
              >
                Past
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-primary" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      {event.isPast ? (
                        <Badge variant="outline" className="border-gray-500 text-gray-500">
                          Past
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Upcoming
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{event.registrations || 0}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          asChild
                        >
                          <Link to={`/admin/events/edit/${event.id}`}>
                            <span className="sr-only">Edit</span>
                            <Edit size={16} />
                          </Link>
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 border-red-200 text-red-500 hover:text-red-600"
                            >
                              <span className="sr-only">Delete</span>
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the event. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteEvent(event.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {searchTerm ? "No events match your search criteria." : "No events have been created yet."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EventsManagement;
