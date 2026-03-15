export interface User {
  id: string;
  name: string;
  role: 'admin' | 'leader' | 'employee';
  status: 'active' | 'hold' | 'inactive';
  avatar: string;
  tasksCount: number;
}

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
}

export const mockUsers: User[] = [
  { id: '1', name: 'Zayed Ahmed', role: 'leader', status: 'active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop', tasksCount: 4 },
  { id: '2', name: 'Maria Garcia', role: 'leader', status: 'active', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop', tasksCount: 3 },
  { id: '3', name: 'John Doe', role: 'employee', status: 'active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop', tasksCount: 5 },
  { id: '4', name: 'Sofia G', role: 'employee', status: 'hold', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop', tasksCount: 2 },
  { id: '5', name: 'Neil S', role: 'employee', status: 'inactive', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop', tasksCount: 0 },
];

export const mockTasks: Task[] = [
  { id: '101', title: 'Landing Page Hookup', assignedTo: 'Zayed Ahmed', status: 'in-progress', priority: 'high' },
  { id: '102', title: 'Asset Optimization', assignedTo: 'John Doe', status: 'todo', priority: 'medium' },
  { id: '103', title: 'Color Palette Refresh', assignedTo: 'Maria Garcia', status: 'review', priority: 'low' },
  { id: '104', title: 'Leaderboard UI Design', assignedTo: 'Sofia G', status: 'in-progress', priority: 'high' },
];
