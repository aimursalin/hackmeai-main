import { motion } from "framer-motion";
import { Timeline, TimelineItem } from "@/components/ui/modern-timeline";

const RadarChart = () => {
  const center = 500;
  const radius = 300;
  const categories = [
    { name: "[ UI/UX ]", value: 95 },
    { name: "[ BRANDING ]", value: 85 },
    { name: "[ WEB DESIGN ]", value: 100 },
    { name: "[ MOTION ]", value: 80 },
    { name: "[ 3D DESIGN ]", value: 70 },
    { name: "[ AD CREATIVE ]", value: 90 },
    { name: "[ PRINT ]", value: 60 },
    { name: "[ STRATEGY ]", value: 85 },
  ];

  const points = categories.map((cat, i) => {
    const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
    const x = center + (radius * cat.value) / 100 * Math.cos(angle);
    const y = center + (radius * cat.value) / 100 * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative w-full max-w-[550px] mx-auto opacity-60 hover:opacity-100 transition-opacity duration-700 ease-in-out cursor-default">
      <svg viewBox="0 0 1000 1000" className="w-full h-full drop-shadow-2xl">
        {/* Concentric circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-white/5"
          />
        ))}
        
        {/* Axes */}
        {categories.map((_, i) => {
          const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
          const x = center + radius * 1.1 * Math.cos(angle);
          const y = center + radius * 1.1 * Math.sin(angle);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-white/10"
            />
          );
        })}

        {/* Categories Labels and End Points */}
        {categories.map((cat, i) => {
          const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
          const labelR = radius * 1.25;
          const x = center + labelR * Math.cos(angle);
          const y = center + labelR * Math.sin(angle);
          
          const pointX = center + radius * 1.1 * Math.cos(angle);
          const pointY = center + radius * 1.1 * Math.sin(angle);

          return (
            <g key={`label-${i}`}>
              <text
                x={x}
                y={y}
                fill="currentColor"
                fontSize="22"
                fontWeight="400"
                textAnchor="middle"
                alignmentBaseline="middle"
                className="text-white/60 tracking-[0.15em] font-light"
              >
                {cat.name}
              </text>
              <circle
                cx={pointX}
                cy={pointY}
                r="5"
                fill="currentColor"
                className="text-white/30"
              />
              <circle
                cx={pointX}
                cy={pointY}
                r="2.5"
                fill="#000"
              />
            </g>
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={points}
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-accent drop-shadow-[0_0_20px_rgba(0,119,255,0.4)] transition-all duration-700 hover:fill-opacity-30"
        />

        {/* Data Points */}
        {categories.map((cat, i) => {
          const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
          const x = center + (radius * cat.value) / 100 * Math.cos(angle);
          const y = center + (radius * cat.value) / 100 * Math.sin(angle);
          return (
            <g key={`data-point-${i}`}>
              <circle
                cx={x}
                cy={y}
                r="7"
                fill="currentColor"
                className="text-accent"
              />
              <circle
                cx={x}
                cy={y}
                r="3.5"
                fill="#000"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const timelineItems: TimelineItem[] = [
  {
    title: "The Genesis",
    description: "Founded with a vision to eliminate design friction for global founders. Started as a small elite squad of design architects.",
    date: "Q1 2024",
    category: "Foundation",
    status: "completed"
  },
  {
    title: "Dominance Pass Launch",
    description: "Introduced our signature subscription model, revolutionizing how companies access high-end UI/UX expertise.",
    date: "Q2 2024",
    category: "Product",
    status: "completed"
  },
  {
    title: "Global Connectivity",
    description: "Expanded our reach across 8+ countries, establishing the 24/7 asynchronous design cycle that defines us today.",
    date: "Q3 2024",
    category: "Growth",
    status: "completed"
  },
  {
    title: "AI Design Integration",
    description: "Leveraging proprietary AI workflows to accelerate decision architecture while maintaining elite human precision.",
    date: "Q4 2024",
    category: "Innovation",
    status: "current"
  },
  {
    title: "The 3D Frontier",
    description: "Integrating high-fidelity 3D motion and immersive spatial design into every core engagement.",
    date: "Q1 2025",
    category: "Upcoming",
    status: "upcoming"
  }
];

const About = () => {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden bg-background">
      {/* Background elegant dot mesh pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">About Us</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Built for precision.</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg text-foreground/80">
                Dominance Digital is a collective of elite designers and developers who believe that design is not decoration—it's decision architecture.
              </p>
              <p>
                We work with founders and CMOs who need reliability over flash. Every pixel we ship is intentional. Every interaction we design converts. Every system we build scales.
              </p>
              <p>
                Our team operates asynchronously across time zones, delivering world-class design with the speed and consistency of a product team—without the overhead.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { stat: "200+", label: "Global Clients" },
                { stat: "4.9/5", label: "Trustpilot Rating" },
                { stat: "99%", label: "Success Rate" },
              ].map((item) => (
                <div key={item.label} className="glass-surface rounded-2xl p-4 text-center">
                  <p className="text-2xl font-bold text-foreground tabular-nums mb-1">{item.stat}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Soft background glow for the chart */}
            <div className="absolute inset-0 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            
            <RadarChart />
          </motion.div>
        </div>

        {/* Dynamic Journey Timeline */}
        <div className="mt-40 border-t border-white/5 pt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From a simple idea to a global platform serving elite founders worldwide.</p>
          </div>
          <Timeline items={timelineItems} />
        </div>
      </div>
    </section>
  );
};

export default About;
