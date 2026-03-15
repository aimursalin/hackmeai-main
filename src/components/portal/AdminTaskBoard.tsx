import { mockTasks, mockUsers } from "@/data/portalData";
import { Clock, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";

const AdminTaskBoard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Live Workforce</h2>
        <p className="text-white/40 text-sm">Real-time overview of active assignments and progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockTasks.map((task) => {
          const user = mockUsers.find(u => u.name === task.assignedTo);
          return (
            <div key={task.id} className="glass-surface p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    task.status === 'in-progress' ? 'bg-blue-400' : 
                    task.status === 'review' ? 'bg-amber-400' :
                    task.status === 'done' ? 'bg-emerald-400' : 'bg-white/20'
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
                {task.title}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
              </h3>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full border border-white/10" />
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Assigned To</p>
                    <p className="text-sm font-semibold text-white/80">{task.assignedTo}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest text-right">Progress</p>
                  <p className="text-sm font-semibold text-white/80">
                    {task.status === 'done' ? '100%' : task.status === 'review' ? '90%' : task.status === 'in-progress' ? '45%' : '0%'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminTaskBoard;
