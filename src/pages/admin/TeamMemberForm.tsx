
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData, TeamMember } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const TeamMemberForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { teamMembers, addTeamMember, updateTeamMember } = useData();
  
  const [formData, setFormData] = useState<Omit<TeamMember, "id">>({
    name: "",
    role: "",
    year: "2024-25",
    image: "",
    linkedin: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // If id is provided, load the existing team member
  useEffect(() => {
    if (id) {
      const member = teamMembers.find(member => member.id === id);
      
      if (member) {
        setFormData({
          name: member.name,
          role: member.role,
          year: member.year,
          image: member.image,
          linkedin: member.linkedin,
        });
      }
    }
  }, [id, teamMembers]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: "2024-25" | "2025-26") => {
    setFormData(prev => ({ ...prev, year: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (id) {
        updateTeamMember(id, formData);
      } else {
        addTeamMember(formData);
      }
      
      setIsSubmitting(false);
      navigate("/admin/team");
    }, 1000);
  };
  
  const isEditing = !!id;
  
  return (
    <div>
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="mb-4 hover:bg-gray-100 -ml-2 text-gray-600" 
          onClick={() => navigate("/admin/team")}
        >
          <ArrowLeft size={18} className="mr-1" /> Back to Team
        </Button>
        
        <h1 className="text-3xl font-bold text-secondary mb-2">
          {isEditing ? "Edit Team Member" : "Add Team Member"}
        </h1>
        <p className="text-gray-500">
          {isEditing ? "Update the team member details" : "Fill in the details to add a new team member"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Team Member Details</CardTitle>
            <CardDescription>
              Enter the information about the team member
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. President, Vice President, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select
                value={formData.year}
                onValueChange={(value: "2024-25" | "2025-26") => handleSelectChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-25">2024-25</SelectItem>
                  <SelectItem value="2025-26">2025-26</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Profile Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                required
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isEditing ? "Updating..." : "Adding..."
                  : isEditing ? "Update Team Member" : "Add Team Member"
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default TeamMemberForm;
