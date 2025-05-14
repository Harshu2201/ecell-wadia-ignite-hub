
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData, Event } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const EventForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useData();
  
  const [formData, setFormData] = useState<Omit<Event, "id">>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
    image: "",
    isPast: false,
    registrations: 0,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // If id is provided, load the existing event
  useEffect(() => {
    if (id) {
      const event = events.find(event => event.id === id);
      
      if (event) {
        setFormData({
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
          image: event.image,
          isPast: event.isPast,
          registrations: event.registrations || 0,
        });
      }
    }
  }, [id, events]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPast: checked }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (id) {
        updateEvent(id, formData);
      } else {
        addEvent(formData);
      }
      
      setIsSubmitting(false);
      navigate("/admin/events");
    }, 1000);
  };
  
  const isEditing = !!id;
  
  return (
    <div>
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="mb-4 hover:bg-gray-100 -ml-2 text-gray-600" 
          onClick={() => navigate("/admin/events")}
        >
          <ArrowLeft size={18} className="mr-1" /> Back to Events
        </Button>
        
        <h1 className="text-3xl font-bold text-secondary mb-2">
          {isEditing ? "Edit Event" : "Create New Event"}
        </h1>
        <p className="text-gray-500">
          {isEditing ? "Update the event details" : "Fill in the details to create a new event"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Enter the information about the event
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the event"
                rows={6}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Event location"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPast"
                  checked={formData.isPast}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="isPast" className="cursor-pointer">
                  Mark as Past Event
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="registrations">Registrations</Label>
                <Input
                  id="registrations"
                  name="registrations"
                  type="number"
                  value={formData.registrations}
                  onChange={handleNumberChange}
                  min={0}
                />
                <p className="text-xs text-gray-500">
                  Number of people registered for this event
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isEditing ? "Updating..." : "Creating..."
                  : isEditing ? "Update Event" : "Create Event"
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default EventForm;
