import { motion } from "framer-motion";
import { Play } from "lucide-react";

const stories = [
  {
    id: 1,
    name: "Snobi Rahman",
    role: "Founder @ Relaxy",
    quote: "Design Monks felt like part of our own team. They understood our vision, built a scalable platform, and executed incredibly fast.",
    color: "from-[#a3f3e1] to-[#60d6bd]",
    thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Emran Hasan",
    role: "CEO & Co Founder @ Klasio",
    quote: "Thanks to Design Monks for building a world-class website that captured our vision and accelerated our business goals.",
    color: "from-[#bea9ff] to-[#8d70ff]",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Neil Saidi",
    role: "Product Manager @ Plate",
    quote: "They managed to turn a complex feature set into an incredibly simple user experience for our users.",
    color: "from-[#ff9c6a] to-[#ff7d3b]",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Sofia Gouveia",
    role: "Design Director @ Esdiac",
    quote: "Working with Design Monks on our ESDIAC app and group websites was an excellent experience. High marks for creativity.",
    color: "from-[#e4ac7e] to-[#c28c61]",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    name: "Alex Mercer",
    role: "CTO @ Nexus",
    quote: "Precision, speed, and beautiful design. That's what you get when you work with this incredibly talented team.",
    color: "from-[#7ee4c2] to-[#45c29a]",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
  }
];

const SuccessStories = () => {
  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block border border-accent/30 text-accent rounded-full px-4 py-1.5 text-sm mb-6 bg-accent/5 backdrop-blur-sm">
            Client Stories
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-foreground leading-[1.1]">
            Success <span className="italic font-light opacity-90">Stories</span><br />
            That <span className="italic font-light opacity-90">Inspire Us</span>
          </h2>
        </motion.div>
      </div>

      {/* Client Stories Row */}
      <div className="relative w-full overflow-hidden flex cursor-grab active:cursor-grabbing pb-24">
        <div className="flex animate-marquee-reverse hover:[animation-play-state:paused] gap-6 px-6">
           {[...stories, ...stories].map((story, i) => (
              <ReviewCard key={`${story.id}-${i}`} story={story} />
           ))}
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ story }: { story: typeof stories[0] }) => (
  <div className="relative flex-none w-[300px] md:w-[350px] h-[450px] rounded-3xl overflow-hidden group border border-white/5">
    <div className={`absolute inset-0 bg-gradient-to-b ${story.color} opacity-40`} />
    <img 
      src={story.thumbnail} 
      alt={story.name}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 hover:scale-110 transition-all border border-white/20">
      <Play className="w-5 h-5 text-white ml-1 fill-white" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-left">
        <p className="text-xs font-light leading-relaxed opacity-90 mb-3 line-clamp-3">"{story.quote}"</p>
        <h4 className="font-bold text-base mb-0.5">{story.name}</h4>
        <p className="text-[10px] opacity-75 font-medium">{story.role}</p>
    </div>
  </div>
);

export default SuccessStories;
