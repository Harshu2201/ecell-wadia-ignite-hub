
import { useParams, Link, useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Edit, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { blogPosts, deleteBlogPost } = useData();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const blog = blogPosts.find(blog => blog.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/blogs">Back to Blogs</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    deleteBlogPost(blog.id);
    navigate('/blogs');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-96 overflow-hidden">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:p-8">
            <Button 
              variant="ghost" 
              className="mb-6 hover:bg-gray-100 -ml-2 text-gray-600" 
              asChild
            >
              <Link to="/blogs">
                <ArrowLeft size={18} className="mr-1" /> Back to Blogs
              </Link>
            </Button>
            
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {new Date(blog.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                {blog.author}
              </div>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                {blog.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              {blog.title}
            </h1>
            
            {isAdmin && (
              <div className="flex gap-3 mb-6">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}
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
                        This will permanently delete the blog post. This action cannot be undone.
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
                {blog.content}
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter(post => post.id !== blog.id)
              .slice(0, 3)
              .map(relatedPost => (
                <div 
                  key={relatedPost.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden card-hover"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors">
                      <Link to={`/blogs/${relatedPost.id}`}>{relatedPost.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Button variant="ghost" className="text-primary hover:text-primary/90 p-0" asChild>
                      <Link to={`/blogs/${relatedPost.id}`}>Read More</Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
