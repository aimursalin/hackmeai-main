import { useState, useEffect } from "react";
import { Clock, CheckCircle2, AlertCircle, ArrowUpRight, Loader2, User as UserIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Task {
  id: string;
  name: string;
  status: string;
  priority: string;
  assigned_to: string;
  assignee_name?: string;
  assignee_avatar?: string;
}

const AdminTaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);

        // Fetch all projects
        const { data: projectData, error: projError } = await supabase
          .from('projects')
          .select('id, name, status, priority, assigned_to');

        if (projError) throw projError;

        // Fetch all profiles for assignee mapping
        const { data: profileData } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url');

        const profileMap = new Map(
          (profileData || []).map(p => [p.id, { name: p.full_name, avatar: p.avatar_url }])
        );

        if (projectData) {
          setTasks(projectData.map(p => ({
            id: p.id,
            name: p.name || 'Untitled',
            status: p.status || 'todo',
            priority: p.priority || 'medium',
            assigned_to: p.assigned_to || '',
            assignee_name: profileMap.get(p.assigned_to)?.name || 'Unassigned',
            assignee_avatar: profileMap.get(p.assigned_to)?.avatar || '',
          })));
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Live Workforce</h2>
        <p className="text-white/40 text-sm">Real-time overview of active assignments and progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="glass-surface p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  task.status === 'in-progress' || task.status === 'active' ? 'bg-blue-400' : 
                  task.status === 'review' ? 'bg-amber-400' :
                  task.status === 'done' || task.status === 'completed' ? 'bg-emerald-400' : 'bg-white/20'
                }`} />
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{task.status}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                task.priority === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                task.priority === 'medium' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                'bg-white/5 text-white/40 border border-white/10'
              }`}>
                {task.priority} Priority
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition-colors flex items-center gap-2">
              {task.name}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
            </h3>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                  {task.assignee_avatar ? (
                    <img src={task.assignee_avatar} alt={task.assignee_name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-white/40" />
                  )}
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Assigned To</p>
                  <p className="text-sm font-semibold text-white/80">{task.assignee_name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest text-right">Progress</p>
                <p className="text-sm font-semibold text-white/80">
                  {task.status === 'done' || task.status === 'completed' ? '100%' : task.status === 'review' ? '90%' : task.status === 'in-progress' || task.status === 'active' ? '45%' : '0%'}
                </p>
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-white/20 text-sm text-center py-8 col-span-2">No active tasks found</p>
        )}
      </div>
    </div>
  );
};

export default AdminTaskBoard;
