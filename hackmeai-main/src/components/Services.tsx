import { motion } from "framer-motion";
import { ArrowUpRight, Palette, Layout, Globe, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { services } from "@/data/services";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const icons = {
  "graphic-design": Palette,
  "ui-ux-design": Layout,
  "web-design": Globe,
  "ads-design": Megaphone,
};

const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Services</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">What we craft</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = icons[service.id as keyof typeof icons];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => navigate(`/services/${service.slug}`)}
                className="relative list-none cursor-pointer group min-h-[12rem]"
              >
                <div className="relative h-full w-full rounded-[1.1rem] border-[0.75px] border-border/20 p-1.5 md:rounded-[1.25rem] md:p-2">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="relative flex h-full flex-col gap-3 overflow-hidden rounded-[0.9rem] border-[0.75px] bg-[#0c0516] p-4 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-5 hover:bg-[#120822] transition-colors border-purple-500/10">
                    <div className="flex items-start justify-between mb-0.5">
                       <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center border border-white/5">
                          <Icon className="w-4 h-4 text-purple-300" strokeWidth={1.5} />
                       </div>
                       <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-300 transition-colors" strokeWidth={1.5} />
                    </div>
                    <div>
                       <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                       <p className="text-purple-200/60 text-xs leading-relaxed line-clamp-2">{service.description}</p>
                    </div>
                    <div className="mt-auto pt-3 flex items-center gap-2 text-[10px] text-purple-300/60 border-t border-white/5">
                       <span className="tabular-nums">{service.designers?.length || 0} designers</span>
                       <span className="w-0.5 h-0.5 rounded-full bg-purple-300/40" />
                       <span>12 portfolio pieces</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
