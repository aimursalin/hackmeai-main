import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { testimonials as stories } from "@/data/siteData";

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
