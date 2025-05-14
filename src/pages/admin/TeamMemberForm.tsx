
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData, TeamMember } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, X, Camera } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/components/ui/use-toast";

const TeamMemberForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { teamMembers, addTeamMember, updateTeamMember } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<Omit<TeamMember, "id">>({
    name: "",
    role: "",
    year: "2024-25",
    image: "",
    linkedin: "",
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
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
        
        // Set image preview if there's already an image
        if (member.image) {
          setImagePreview(member.image);
        }
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Basic validation
    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/i)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG or WebP image",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image should be less than 2MB",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Read the file as data URL for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData(prev => ({ ...prev, image: result }));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast({
        title: "Image required",
        description: "Please upload a profile image",
        variant: "destructive",
      });
      return;
    }
    
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
      
      toast({
        title: "Success!",
        description: id ? "Team member updated successfully" : "Team member added successfully",
      });
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
            {/* Image Upload Section */}
            <div className="space-y-2">
              <Label>Profile Image</Label>
              <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="w-40 h-40 relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <AspectRatio ratio={1}>
                          <img 
                            src={imagePreview} 
                            alt="Profile preview" 
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 w-7 h-7"
                          onClick={removeImage}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ) : (
                      <Camera size={32} className="text-gray-400" />
                    )}
                  </div>
                </div>
                
                <div className="w-full md:w-2/3 space-y-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleImageUpload}
                  />
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    disabled={isUploading}
                    className="w-full md:w-auto"
                  >
                    <Upload size={16} className="mr-2" />
                    {imagePreview ? "Change Image" : "Upload Image"}
                  </Button>
                  
                  <div className="text-sm text-gray-500">
                    <p>Accepted formats: JPEG, PNG, WebP</p>
                    <p>Maximum file size: 2MB</p>
                  </div>
                </div>
              </div>
            </div>
            
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
                disabled={isSubmitting || isUploading}
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
