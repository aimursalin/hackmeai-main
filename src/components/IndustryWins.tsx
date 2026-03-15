import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const industries = [
  {
    id: "travel",
    name: "Travel",
    title: "Easy Booking for Dream Trips",
    description: "Triply is a hassle-free & effective tour solution for travelers. It's an all-inclusive booking and planning website that helps people make their dream trips easier.",
    stats: [
      { label: "Pages in Projects", value: "40+" },
      { label: "Retention Growth", value: "36%" },
    ],
    ceo: { name: "Shubho Al-Farooque", org: "Triply CEO", avatar: "SA" },
    color: "bg-[#9ba1ff]", 
    textColor: "text-[#1e1e1e]",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    title: "Transform Your Dining",
    description: "At Plate, we bring you a handpicked selection of premium restaurants that offer not just meals, but memorable dining experiences, you'll cherish.",
    stats: [
      { label: "Location", value: "France" },
      { label: "Project Duration", value: "5 Months" },
    ],
    ceo: { name: "Neil Saidi", org: "Plate CEO", avatar: "NS" },
    color: "bg-[#ffa199]",
    textColor: "text-[#1e1e1e]",
  },
  {
    id: "saas",
    name: "SaaS",
    title: "Reducing Carbon Footprints",
    description: "Yenex is a smart and sustainable energy platform. It empowers users with distributed energy solutions to reduce carbon footprints effortlessly.",
    stats: [
      { label: "Project timeline", value: "2.5 Months" },
      { label: "Customer Acquisition", value: "40%" },
    ],
    ceo: { name: "Ted Nash", org: "Yenex CEO", avatar: "TN" },
    color: "bg-[#fcdca1]",
    textColor: "text-[#1e1e1e]",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    title: "Simplifying Health Care",
    description: "Zantrik is an innovative healthcare maintenance app. We revamped it with a fresh design, gamification, and intuitive features to boost user engagement.",
    stats: [
      { label: "Project Duration", value: "8 Weeks" },
      { label: "Work Scope", value: "Mobile App" },
    ],
    ceo: { name: "Alex Mercer", org: "Zantrik CEO", avatar: "AM" },
    color: "bg-[#45f4cb]",
    textColor: "text-[#1e1e1e]",
  }
];

const IndustryWins = () => {
  return (
    <section className="py-32 px-6 bg-background relative z-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <HoverBorderGradient
            containerClassName="mb-6 inline-flex"
            as="div"
            className="flex items-center text-emerald-400 text-sm bg-[#050510]"
          >
            <span>Industry Wins</span>
          </HoverBorderGradient>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1]">
            Proven Success <br />
            in <span className="italic font-light text-foreground/80">Every Industry</span>
          </h2>
        </motion.div>

        {/* Stacking Cards Container */}
        <div className="relative pb-20">
          {industries.map((ind, i) => (
            <div
              key={ind.id}
              className="sticky"
              style={{ top: `calc(15vh + ${i * 45}px)`, marginBottom: "40px" }}
            >
              <div 
                className={`w-full ${ind.color} ${ind.textColor} rounded-[2rem] p-6 lg:p-8 shadow-2xl transition-transform duration-500 hover:scale-[1.01]`}
                style={{ 
                   boxShadow: "0 -20px 40px rgba(0,0,0,0.3), 0 20px 40px rgba(0,0,0,0.2)",
                   transformOrigin: "top center"
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  
                  {/* Content Side */}
                  <div>
                    <h3 className="text-lg font-bold italic mb-4 opacity-80">{ind.name}</h3>
                    <h4 className="text-2xl md:text-3xl font-bold mb-4">{ind.title}</h4>
                    <p className="text-sm opacity-80 leading-relaxed mb-8 max-w-sm">
                      {ind.description}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {ind.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-xs opacity-70 mb-1">{stat.label}</p>
                          <p className="text-xl font-bold">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between bg-black/5 rounded-2xl p-3 cursor-pointer hover:bg-black/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center font-bold text-sm">
                          {ind.ceo.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-sm flex items-center gap-2">
                            {ind.ceo.name}
                          </p>
                          <p className="text-xs opacity-70">{ind.ceo.org}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-black" />
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="relative h-full min-h-[300px] w-full bg-black/10 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-black/5">
                    {/* Placeholder for the design/UI mockup */}
                    <div className="w-full h-full bg-black/10 rounded-xl shadow-2xl relative overflow-hidden backdrop-blur-md border border-black/10 flex items-center justify-center">
                       <span className="font-medium text-black/40 text-sm uppercase tracking-widest">{ind.name} Dashboard</span>
                       
                       {/* Subtle UI Accents */}
                       <div className="absolute top-4 left-4 right-4 h-4 border-b border-black/10 flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-black/20" />
                          <div className="w-2 h-2 rounded-full bg-black/20" />
                          <div className="w-2 h-2 rounded-full bg-black/20" />
                       </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryWins;
