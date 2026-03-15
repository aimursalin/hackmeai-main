import { useState } from "react";
import { mockUsers, User } from "@/data/portalData";
import { Power, Pause, Play, Shield, User as UserIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const { toast } = useToast();

  const toggleStatus = (userId: string, newStatus: 'active' | 'hold' | 'inactive') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    toast({
      title: `User ${newStatus}`,
      description: `Access for ${users.find(u => u.id === userId)?.name} has been updated to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Central Management</h2>
        <p className="text-white/40 text-sm">Control access and permissions for all team leaders and employees.</p>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="glass-surface p-6 rounded-[1.5rem] flex items-center justify-between border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-black ${
                  user.status === 'active' ? 'bg-emerald-500' : user.status === 'hold' ? 'bg-amber-500' : 'bg-rose-500'
                }`} />
              </div>
              <div>
                <h3 className="text-white font-semibold flex items-center gap-2">
                  {user.name} 
                  {user.role === 'leader' && <Shield className="w-3 h-3 text-blue-400" />}
                </h3>
                <p className="text-white/30 text-xs uppercase tracking-widest font-bold mt-0.5">
                  {user.role} • {user.tasksCount} active tasks
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {user.status !== 'active' && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-9 px-3 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-xl gap-2"
                  onClick={() => toggleStatus(user.id, 'active')}
                >
                  <Play className="w-3.5 h-3.5" /> Resume
                </Button>
              )}
              {user.status === 'active' && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-9 px-3 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-xl gap-2"
                  onClick={() => toggleStatus(user.id, 'hold')}
                >
                  <Pause className="w-3.5 h-3.5" /> Hold
                </Button>
              )}
              <Button 
                size="sm" 
                variant="ghost" 
                className={`h-9 px-3 rounded-xl gap-2 ${user.status === 'inactive' ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'}`}
                onClick={() => toggleStatus(user.id, user.status === 'inactive' ? 'active' : 'inactive')}
              >
                <Power className="w-3.5 h-3.5" /> {user.status === 'inactive' ? 'Turn On' : 'Turn Off'}
              </Button>
              <Button size="icon" variant="ghost" className="rounded-xl text-white/20 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManagement;
