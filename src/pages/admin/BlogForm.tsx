
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData, BlogPost } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const categories = ["Startup", "Funding", "Team Building", "Leadership", "Innovation"];

const BlogForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blogPosts, addBlogPost, updateBlogPost } = useData();
  
  const [formData, setFormData] = useState<Omit<BlogPost, "id">>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    category: "Startup",
    image: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // If id is provided, load the existing blog post
  useEffect(() => {
    if (id) {
      const blogPost = blogPosts.find(blog => blog.id === id);
      
      if (blogPost) {
        setFormData({
          title: blogPost.title,
          excerpt: blogPost.excerpt,
          content: blogPost.content,
          author: blogPost.author,
          date: blogPost.date,
          category: blogPost.category,
          image: blogPost.image,
        });
      }
    }
  }, [id, blogPosts]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (id) {
        updateBlogPost(id, formData);
      } else {
        addBlogPost(formData);
      }
      
      setIsSubmitting(false);
      navigate("/admin/blogs");
    }, 1000);
  };
  
  const isEditing = !!id;
  
  return (
    <div>
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="mb-4 hover:bg-gray-100 -ml-2 text-gray-600" 
          onClick={() => navigate("/admin/blogs")}
        >
          <ArrowLeft size={18} className="mr-1" /> Back to Blogs
        </Button>
        
        <h1 className="text-3xl font-bold text-secondary mb-2">
          {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>
        <p className="text-gray-500">
          {isEditing ? "Update the blog post details" : "Fill in the details to create a new blog post"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Blog Post Details</CardTitle>
            <CardDescription>
              Enter the information about the blog post
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
                placeholder="Enter blog title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="A short summary of the blog post"
                rows={2}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write the blog content here"
                rows={10}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Publication Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isEditing ? "Updating..." : "Creating..."
                  : isEditing ? "Update Blog Post" : "Create Blog Post"
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default BlogForm;
