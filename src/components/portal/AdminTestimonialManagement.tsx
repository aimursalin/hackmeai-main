import { useState, useEffect } from "react";
import { testimonials as defaultTestimonials, Testimonial } from "@/data/siteData";
import { MessageSquare, Quote, Plus, Trash2, Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const AdminTestimonialManagement = () => {
  const [list, setList] = useState<Testimonial[]>(defaultTestimonials);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped: Testimonial[] = data.map((t: any) => ({
            id: t.id,
            name: t.name || 'Anonymous',
            role: t.role || 'Client',
            thumbnail: t.thumbnail || t.avatar_url || '',
            quote: t.quote || t.message || '',
            color: t.color || 'from-[#a3f3e1] to-[#60d6bd]',
          }));
          setList(mapped);
        }
        // If no data in Supabase, keep the default testimonials
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        // Keep defaults on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

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
