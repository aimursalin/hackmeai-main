import { useState } from "react";
import { teamMembers, TeamMember } from "@/data/siteData";
import { User, Briefcase, Star, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminTeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Team management</h2>
          <p className="text-white/40 text-sm">Update your elite squad profiles and accomplishments.</p>
        </div>
        <Button className="bg-white text-black hover:bg-white/90 rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Add Member
        </Button>
      </div>

      <div className="grid gap-4">
        {members.map((member) => (
          <div key={member.name} className="glass-surface p-6 rounded-[1.5rem] flex items-center justify-between border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-white/40" />
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold flex items-center gap-2">
                  {member.name}
                </h3>
                <p className="text-white/30 text-xs uppercase tracking-widest font-bold mt-0.5">
                  {member.role} • {member.tag}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 mr-4">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-xs text-white/80">{member.stars}</span>
              </div>
              <Button size="icon" variant="ghost" className="rounded-xl text-white/20 hover:text-white hover:bg-white/5">
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-xl text-white/20 hover:text-rose-500 hover:bg-rose-500/5">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTeamManagement;
