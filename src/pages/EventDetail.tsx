
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Users, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { events, registerForEvent, deleteEvent } = useData();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const event = events.find(event => event.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      registerForEvent(event.id, { name, email, phone });
      setName("");
      setEmail("");
      setPhone("");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate('/events');
  };

  const isPastEvent = event.isPast;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-gray-100 -ml-2 text-gray-600" 
          asChild
        >
          <Link to="/events">
            <ArrowLeft size={18} className="mr-1" /> Back to Events
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-80 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
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
                
                <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                  {event.title}
                </h1>
                
                {isAdmin && (
                  <div className="flex gap-3 mb-6">
                    <Button 
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => navigate(`/admin/event/edit/${event.id}`)}
                    >
                      <Edit size={16} className="mr-2" /> Edit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={16} className="mr-2" /> Delete
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
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
                
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">
                  {isPastEvent ? "Event Summary" : "Register for this Event"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPastEvent ? (
                  <div>
                    <p className="text-gray-600 mb-4">
                      This event has already taken place on {new Date(event.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}.
                    </p>
                    {event.registrations && (
                      <div className="flex items-center text-gray-700 mb-4">
                        <Users size={20} className="mr-2 text-primary" />
                        <span className="font-medium">{event.registrations} people attended</span>
                      </div>
                    )}
                    <p className="text-gray-600 mb-6">
                      Stay tuned for upcoming events! Check our events page regularly for new announcements.
                    </p>
                    <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                      <Link to="/events">View More Events</Link>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleRegistration} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Register Now"}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      By registering, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Events */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">More Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .filter(e => e.id !== event.id)
              .slice(0, 3)
              .map(relatedEvent => (
                <Card key={relatedEvent.id} className="overflow-hidden card-hover">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedEvent.image} 
                      alt={relatedEvent.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-primary" />
                        {new Date(relatedEvent.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1 text-primary" />
                        {relatedEvent.location}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors">
                      <Link to={`/events/${relatedEvent.id}`}>{relatedEvent.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {relatedEvent.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-primary text-primary hover:bg-primary hover:text-white w-full" 
                      asChild
                    >
                      <Link to={`/events/${relatedEvent.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
