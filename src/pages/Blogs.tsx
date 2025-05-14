
import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type BlogCategory = "All" | "Startup" | "Funding" | "Team Building" | "Leadership" | "Innovation";

const Blogs = () => {
  const { blogPosts } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");

  const categories: BlogCategory[] = [
    "All", 
    "Startup", 
    "Funding", 
    "Team Building", 
    "Leadership", 
    "Innovation"
  ];

  const filteredBlogs = blogPosts.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">Blog & Insights</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest insights, tips, and stories from our entrepreneurship community
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={activeCategory === category ? "bg-primary hover:bg-primary/90" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <Card key={blog.id} className="overflow-hidden card-hover animate-fade-in">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded-md">
                      {blog.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">By {blog.author}</span>
                    <Button variant="ghost" className="text-primary hover:text-primary/90 p-0" asChild>
                      <Link to={`/blogs/${blog.id}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium text-gray-600 mb-2">No blogs found</h3>
            <p className="text-gray-500">
              No blogs match your search criteria. Try different keywords or categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
