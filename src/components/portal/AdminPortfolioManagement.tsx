import { useState, useEffect } from "react";
import { services as defaultServices, Service } from "@/data/services";
import { Layout, Palette, Globe, Megaphone, Plus, Trash2, Edit, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const icons: Record<string, any> = {
  "graphic-design": Palette,
  "ui-ux-design": Layout,
  "web-design": Globe,
  "ads-design": Megaphone,
};

const AdminPortfolioManagement = () => {
  const [list, setList] = useState<Service[]>(defaultServices);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);
        // Fetch categories (services)
        const { data: categories, error: catError } = await supabase
          .from('categories')
          .select('*');

        if (catError) throw catError;

        if (categories && categories.length > 0) {
          // Fetch portfolios for each category
          const { data: portfolios, error: portError } = await supabase
            .from('portfolios')
            .select(`
              *,
              portfolio_items (
                *
              )
            `);

          if (portError) throw portError;

          const mappedServices: Service[] = categories.map(cat => ({
            id: cat.id,
            title: cat.title,
            slug: cat.id, // Fallback slug
            description: '', // Fallback description
            designers: [], 
            portfolio: portfolios
              ?.filter(p => p.category_id === cat.id)
              .flatMap(p => p.portfolio_items.map((item: any) => ({
                id: item.id,
                title: item.title || '',
                image: item.image_url
              }))) || []
          }));
          setList(mappedServices);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Our Crafts</h2>
          <p className="text-white/40 text-sm">Manage services and showcase pieces in the portfolio.</p>
        </div>
        <Button className="bg-white text-black hover:bg-white/90 rounded-xl gap-2">
          <Plus className="w-4 h-4" /> New Service
        </Button>
      </div>

      <div className="grid gap-6">
        {list.map((service) => {
          const Icon = icons[service.id] || Layout;
          return (
            <div key={service.id} className="glass-surface p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Icon className="w-6 h-6 text-white/60" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <p className="text-white/40 text-xs mt-1">{service.designers?.length || 0} active designers</p>
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

              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {service.portfolio?.map((item) => (
                  <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden border border-white/5 group/thumb">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale opacity-50 group-hover/thumb:grayscale-0 group-hover/thumb:opacity-100 transition-all" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-white">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <button className="aspect-square rounded-xl border border-dashed border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group/add">
                   <Plus className="w-5 h-5 text-white/20 group-hover/add:text-white/40" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPortfolioManagement;
