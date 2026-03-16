import { useState, useEffect } from "react";
import { faqs as defaultFaqs, FAQItem } from "@/data/siteData";
import { HelpCircle, Plus, Trash2, Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const AdminFAQManagement = () => {
  const [list, setList] = useState<FAQItem[]>(defaultFaqs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const mappedFaqs: FAQItem[] = data.map(f => ({
            q: f.question,
            a: f.answer
          }));
          setList(mappedFaqs);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Knowledge Base</h2>
          <p className="text-white/40 text-sm">Manage the frequently asked questions on the site.</p>
        </div>
        <Button className="bg-white text-black hover:bg-white/90 rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Add FAQ
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid gap-3">
          {list.map((item, i) => (
            <div key={i} className="glass-surface p-6 rounded-2xl flex items-start gap-4 border border-white/5 hover:border-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-5 h-5 text-white/40" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-2">{item.q}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.a}</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
      )}
    </div>
  );
};

export default AdminFAQManagement;
