import { useState } from "react";
import { testimonials, Testimonial } from "@/data/siteData";
import { MessageSquare, Quote, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminTestimonialManagement = () => {
  const [list, setList] = useState<Testimonial[]>(testimonials);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Social Proof</h2>
          <p className="text-white/40 text-sm">Manage client stories and testimonials displayed on the site.</p>
        </div>
        <Button className="bg-white text-black hover:bg-white/90 rounded-xl gap-2">
          <Plus className="w-4 h-4" /> New Story
        </Button>
      </div>

      <div className="grid gap-4">
        {list.map((item) => (
          <div key={item.id} className="glass-surface p-6 rounded-[1.5rem] flex flex-col gap-4 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={item.thumbnail} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div>
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">{item.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="rounded-xl text-white/20 hover:text-white hover:bg-white/5">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-xl text-white/20 hover:text-rose-500 hover:bg-rose-500/5">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="relative group">
               <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/5 group-hover:text-white/10 transition-colors" />
               <p className="text-white/60 text-sm leading-relaxed italic pl-6">
                 {item.quote}
               </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonialManagement;
