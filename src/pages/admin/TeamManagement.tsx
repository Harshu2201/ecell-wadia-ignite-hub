
import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TeamManagement = () => {
  const { teamMembers, deleteTeamMember } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const team2024 = teamMembers.filter(member => member.year === "2024-25");
  const team2025 = teamMembers.filter(member => member.year === "2025-26");
  
  let filteredMembers = teamMembers;
  
  if (activeTab === "2024-25") {
    filteredMembers = team2024;
  } else if (activeTab === "2025-26") {
    filteredMembers = team2025;
  }
  
  filteredMembers = filteredMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">Team Management</h1>
          <p className="text-gray-500">Manage all team members from here</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" asChild>
          <Link to="/admin/team/create">
            <Plus size={18} className="mr-2" /> Add Team Member
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
              placeholder="Search team members..."
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
                All Members
              </TabsTrigger>
              <TabsTrigger 
                value="2024-25" 
                onClick={() => setActiveTab("2024-25")}
                className={activeTab === "2024-25" ? "bg-primary text-white data-[state=active]:bg-primary data-[state=active]:text-white" : ""}
              >
                2024-25
              </TabsTrigger>
              <TabsTrigger 
                value="2025-26" 
                onClick={() => setActiveTab("2025-26")}
                className={activeTab === "2025-26" ? "bg-primary text-white data-[state=active]:bg-primary data-[state=active]:text-white" : ""}
              >
                2025-26
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        member.year === "2024-25" 
                          ? "border-blue-500 text-blue-500" 
                          : "border-purple-500 text-purple-500"
                      }>
                        {member.year}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-600 hover:text-primary"
                      >
                        <Linkedin size={16} className="mr-1" /> Profile
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          asChild
                        >
                          <Link to={`/admin/team/edit/${member.id}`}>
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
                                This will permanently remove {member.name} from the team. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteTeamMember(member.id)}
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
                <Table>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      {searchTerm ? "No team members match your search criteria." : "No team members have been added yet."}
                    </TableCell>
                  </TableRow>
                </Table>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
