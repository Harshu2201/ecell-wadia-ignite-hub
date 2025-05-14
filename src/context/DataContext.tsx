
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  year: '2024-25' | '2025-26';
  image: string;
  linkedin: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  isPast: boolean;
  registrations?: number;
};

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  year: string;
  image?: string;
};

type DataContextType = {
  teamMembers: TeamMember[];
  events: Event[];
  blogPosts: BlogPost[];
  achievements: Achievement[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  registerForEvent: (eventId: string, userData: { name: string; email: string; phone: string; }) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
};

// Sample data
const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Aditya Sharma',
    role: 'President',
    year: '2024-25',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    linkedin: 'https://linkedin.com/in/adityasharma',
  },
  {
    id: '2',
    name: 'Priya Patel',
    role: 'Vice President',
    year: '2024-25',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    linkedin: 'https://linkedin.com/in/priyapatel',
  },
  {
    id: '3',
    name: 'Rohit Verma',
    role: 'Marketing Lead',
    year: '2024-25',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    linkedin: 'https://linkedin.com/in/rohitverma',
  },
  {
    id: '4',
    name: 'Ananya Singh',
    role: 'Secretary',
    year: '2025-26',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    linkedin: 'https://linkedin.com/in/ananyasingh',
  },
  {
    id: '5',
    name: 'Vikram Mehta',
    role: 'Technical Lead',
    year: '2025-26',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    linkedin: 'https://linkedin.com/in/vikrammehta',
  }
];

const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Startup Weekend',
    description: 'A 54-hour event where participants pitch ideas, form teams, and build startups.',
    date: '2023-11-15',
    location: 'Wadia College Campus',
    image: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6',
    isPast: true,
    registrations: 120,
  },
  {
    id: '2',
    title: 'Entrepreneurship Summit',
    description: 'Annual summit featuring keynote speakers, panel discussions, and networking opportunities.',
    date: '2023-12-10',
    location: 'Wadia College Auditorium',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2',
    isPast: true,
    registrations: 250,
  },
  {
    id: '3',
    title: 'Pitch Perfect Competition',
    description: 'Showcase your startup idea and win funding and mentorship opportunities.',
    date: '2024-06-20',
    location: 'Wadia College Conference Hall',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17',
    isPast: false,
  },
  {
    id: '4',
    title: 'Innovation Workshop Series',
    description: 'Weekly workshops focused on different aspects of building successful startups.',
    date: '2024-07-05',
    location: 'Online (Zoom)',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    isPast: false,
  }
];

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How to Validate Your Startup Idea',
    excerpt: 'Learn effective strategies to test your business concept before investing significant resources.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    author: 'Aditya Sharma',
    date: '2023-12-01',
    category: 'Startup',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
  },
  {
    id: '2',
    title: 'Funding Options for Student Entrepreneurs',
    excerpt: 'Explore various funding avenues available specifically for college students with entrepreneurial ambitions.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    author: 'Priya Patel',
    date: '2024-01-15',
    category: 'Funding',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e',
  },
  {
    id: '3',
    title: 'Building a Strong Team for Your Startup',
    excerpt: 'Tips for finding and recruiting the right team members to help grow your startup.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
    author: 'Rohit Verma',
    date: '2024-02-28',
    category: 'Team Building',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
  }
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Best College E-Cell Award',
    description: 'Recognized as the Best Entrepreneurship Cell among engineering colleges in the region.',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad',
  },
  {
    id: '2',
    title: 'Successful Incubation of 5 Startups',
    description: 'Helped incubate and launch 5 successful student startups that secured external funding.',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
  },
  {
    id: '3',
    title: 'National Entrepreneurship Challenge - Finalists',
    description: 'Reached the finals of the prestigious National Entrepreneurship Challenge.',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1546531130-0f3dd5de266b',
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  // Team member operations
  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    setTeamMembers([...teamMembers, newMember]);
    toast.success('Team member added successfully');
  };

  const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, ...member } : m));
    toast.success('Team member updated successfully');
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
    toast.success('Team member removed successfully');
  };

  // Event operations
  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents([...events, newEvent]);
    toast.success('Event added successfully');
  };

  const updateEvent = (id: string, event: Partial<Event>) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...event } : e));
    toast.success('Event updated successfully');
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
    toast.success('Event removed successfully');
  };

  const registerForEvent = (eventId: string, userData: { name: string; email: string; phone: string; }) => {
    setEvents(events.map(e => {
      if (e.id === eventId) {
        return {
          ...e,
          registrations: (e.registrations || 0) + 1
        };
      }
      return e;
    }));
    toast.success('Registration successful');
  };

  // Blog post operations
  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: Date.now().toString() };
    setBlogPosts([...blogPosts, newPost]);
    toast.success('Blog post added successfully');
  };

  const updateBlogPost = (id: string, post: Partial<BlogPost>) => {
    setBlogPosts(blogPosts.map(p => p.id === id ? { ...p, ...post } : p));
    toast.success('Blog post updated successfully');
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(blogPosts.filter(p => p.id !== id));
    toast.success('Blog post removed successfully');
  };

  // Achievement operations
  const addAchievement = (achievement: Omit<Achievement, 'id'>) => {
    const newAchievement = { ...achievement, id: Date.now().toString() };
    setAchievements([...achievements, newAchievement]);
    toast.success('Achievement added successfully');
  };

  const updateAchievement = (id: string, achievement: Partial<Achievement>) => {
    setAchievements(achievements.map(a => a.id === id ? { ...a, ...achievement } : a));
    toast.success('Achievement updated successfully');
  };

  const deleteAchievement = (id: string) => {
    setAchievements(achievements.filter(a => a.id !== id));
    toast.success('Achievement removed successfully');
  };

  return (
    <DataContext.Provider
      value={{
        teamMembers,
        events,
        blogPosts,
        achievements,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addAchievement,
        updateAchievement,
        deleteAchievement,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
