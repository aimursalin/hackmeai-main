export interface TeamMember {
  name: string;
  role: string;
  tag: string;
  image: string;
  experience: { role: string; company: string; duration: string }[];
  skills: string[];
  successRate: string;
  statLabel: string;
  statValue: string;
  stars: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  color: string;
  thumbnail: string;
}

export const teamMembers: TeamMember[] = [
  { 
    name: "Tanim Hossain", 
    role: "Founder & CEO", 
    tag: "The Visionary",
    image: "/mursalin.png",
    experience: [
      { role: "Senior Visual Designer", company: "Meta", duration: "2020 - 2022" },
      { role: "Ads Design Lead", company: "Google", duration: "2018 - 2020" },
    ],
    skills: ["Creative Direction", "UI/UX", "Brand Strategy", "Ad Conversion"],
    successRate: "99.8%",
    statLabel: "Projects Completed",
    statValue: "142",
    stars: 5
  },
  { 
    name: "John Doe", 
    role: "HR", 
    tag: "Cheeser",
    image: "/john.png",
    experience: [
      { role: "Talent Acquisition Lead", company: "Netflix", duration: "2019 - 2023" },
      { role: "HR Representative", company: "Amazon", duration: "2016 - 2019" },
    ],
    skills: ["Talent Scouting", "Culture Building", "Team Management"],
    successRate: "95%",
    statLabel: "Elite Hires",
    statValue: "500+",
    stars: 4
  },
  { 
    name: "Jane Smith", 
    role: "Lead Designer", 
    tag: "Pixel Master",
    image: "/jane.png",
    experience: [
      { role: "Product Designer", company: "Apple", duration: "2021 - 2023" },
      { role: "UI Designer", company: "Stripe", duration: "2019 - 2021" },
    ],
    skills: ["Design Systems", "Figma", "Interaction Design", "Prototyping"],
    successRate: "98.5%",
    statLabel: "Interfaces Shipped",
    statValue: "87",
    stars: 5
  },
  { 
    name: "Prottoy", 
    role: "Developer", 
    tag: "Code Wizard",
    image: "/prottoy.png",
    experience: [
      { role: "Frontend Engineer", company: "Vercel", duration: "2022 - 2024" },
      { role: "Fullstack Developer", company: "Spotify", duration: "2020 - 2022" },
    ],
    skills: ["React", "TypeScript", "WebGL", "Framer Motion", "Next.js"],
    successRate: "99.9%",
    statLabel: "Commits Merged",
    statValue: "10k+",
    stars: 5
  },
];

export const testimonials: Testimonial[] = [
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
export interface FAQItem {
  q: string;
  a: string;
}

export const faqs: FAQItem[] = [
  {
    q: "How fast will I receive my designs?",
    a: "Most requests are delivered within 24–48 hours depending on your plan. Superior plan members receive same-day turnaround on priority requests.",
  },
  {
    q: "What if I'm not satisfied with the design?",
    a: "We offer revision rounds based on your plan. Dominance Superior members get unlimited revisions and lifetime access to request changes on any delivered design.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. There are no contracts or cancellation fees. Cancel anytime from your dashboard—your access remains active until the end of your billing period.",
  },
  {
    q: "How do design credits work?",
    a: "Each design credit covers one design request. Credits don't expire and can be used across any design service we offer—graphic, UI/UX, web, or ads.",
  },
  {
    q: "Can I choose my designer?",
    a: "Yes. Browse our designer profiles in each service category and select 2–4 designers you'd like to work with. We match you based on availability and expertise.",
  },
  {
    q: "What's included in lifetime access?",
    a: "Dominance Superior members can request revisions or changes to any previously delivered design—forever. No additional cost, no expiration.",
  },
];
