export interface Designer {
  id: string;
  name: string;
  avatar: string;
  role: string;
  activeProjects: number;
  successRate: number;
  completedProjects: number;
  bio: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  slug: string;
  designers: Designer[];
  portfolio?: { id: number; title: string; image: string; aspect?: string }[];
}

export const services: Service[] = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Brand identities, print materials, and visual systems that command attention.",
    slug: "graphic-design",
    designers: [
      { id: "gd1", name: "Aria Voss", avatar: "AV", role: "Lead Visual Designer", activeProjects: 2, successRate: 99, completedProjects: 187, bio: "10+ years in brand identity. Former Pentagram." },
      { id: "gd2", name: "Kai Nomura", avatar: "KN", role: "Senior Graphic Designer", activeProjects: 3, successRate: 98, completedProjects: 142, bio: "Specializes in editorial and packaging design." },
      { id: "gd3", name: "Elena Marsh", avatar: "EM", role: "Brand Strategist", activeProjects: 1, successRate: 100, completedProjects: 93, bio: "Bridges strategy and visual execution." },
      { id: "gd4", name: "Dex Calloway", avatar: "DC", role: "Motion & Print Designer", activeProjects: 2, successRate: 97, completedProjects: 121, bio: "Cross-disciplinary design with motion focus." },
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Interfaces that convert. Experiences that retain. Systems that scale.",
    slug: "ui-ux-design",
    designers: [
      { id: "ux1", name: "Mira Chen", avatar: "MC", role: "Lead Product Designer", activeProjects: 2, successRate: 99, completedProjects: 204, bio: "Ex-Figma. Obsessed with design systems." },
      { id: "ux2", name: "Theo Park", avatar: "TP", role: "UX Researcher & Designer", activeProjects: 1, successRate: 98, completedProjects: 156, bio: "Data-driven design decisions." },
      { id: "ux3", name: "Lena Okafor", avatar: "LO", role: "Interaction Designer", activeProjects: 3, successRate: 97, completedProjects: 118, bio: "Micro-interactions and animation specialist." },
      { id: "ux4", name: "Ravi Patel", avatar: "RP", role: "Senior UI Designer", activeProjects: 2, successRate: 99, completedProjects: 167, bio: "Pixel-perfect execution at scale." },
    ],
  },
  {
    id: "web-design",
    title: "Web Design",
    description: "High-performance websites that blend engineering precision with visual craft.",
    slug: "web-design",
    designers: [
      { id: "wd1", name: "Soren Blake", avatar: "SB", role: "Creative Developer", activeProjects: 2, successRate: 99, completedProjects: 178, bio: "Code meets canvas. WebGL & Three.js." },
      { id: "wd2", name: "Yuki Tanaka", avatar: "YT", role: "Web Designer", activeProjects: 1, successRate: 98, completedProjects: 134, bio: "Conversion-focused landing pages." },
      { id: "wd3", name: "Nina Reyes", avatar: "NR", role: "Frontend Designer", activeProjects: 3, successRate: 97, completedProjects: 145, bio: "Design systems implementation expert." },
      { id: "wd4", name: "Alex Storm", avatar: "AS", role: "Lead Web Designer", activeProjects: 1, successRate: 100, completedProjects: 201, bio: "Award-winning Awwwards judge." },
    ],
  },
  {
    id: "ads-design",
    title: "Ads Design",
    description: "Performance creatives that stop the scroll and drive measurable results.",
    slug: "ads-design",
    designers: [
      { id: "ad1", name: "Jade Kim", avatar: "JK", role: "Performance Creative Lead", activeProjects: 3, successRate: 98, completedProjects: 312, bio: "Meta & Google Ads creative specialist." },
      { id: "ad2", name: "Omar Hassan", avatar: "OH", role: "Ad Creative Designer", activeProjects: 2, successRate: 97, completedProjects: 245, bio: "High-volume creative production." },
      { id: "ad3", name: "Freya Lindgren", avatar: "FL", role: "Motion Ads Designer", activeProjects: 2, successRate: 99, completedProjects: 189, bio: "Video and animated ad formats." },
      { id: "ad4", name: "Carlos Vega", avatar: "CV", role: "Senior Ads Designer", activeProjects: 1, successRate: 98, completedProjects: 267, bio: "A/B testing and creative optimization." },
      { id: "ad5", name: "Mursalin Hossain", avatar: "MH", role: "Ads & Visual Designer", activeProjects: 4, successRate: 100, completedProjects: 350, bio: "Transforming ideas into captivating visual stories. Founder of Design Den." },
    ],
    portfolio: [
      { id: 1, title: "Dumpling Design", image: "https://cdn.prod.website-files.com/64891f720421491be3ec460b/665a0e1c0ae4757e9e96a424_dumpling%20design%201.jpg" },
      { id: 2, title: "Modern Ads", image: "https://cdn.prod.website-files.com/64891f720421491be3ec460b/64893198d93afd96337ba5ec_p17.webp" },
      { id: 3, title: "Dumplings Hut Mojito", image: "https://cdn.prod.website-files.com/64891f720421491be3ec460b/665a0e4736dacc9e654f87ac_Dumplings%20hut%20mojito%20mango.jpg" },
      { id: 4, title: "Cocktail Design", image: "https://cdn.prod.website-files.com/64891f720421491be3ec460b/665a0e85546e749833742b53_Cocktail%20Design%201.jpg" },
      { id: 5, title: "Creative Uploading", image: "https://cdn.prod.website-files.com/64891f720421491be3ec460b/64a7b6a0d6b09be15aa785f5_uploading%20copy.webp" },
      { id: 6, title: "Coffee Nescafe", image: "https://cdn.prod.website-files.com/64891f720421491be3ec460b/64a7b5aa54a32332411c2030_cofee%20neslate%20copy.webp" },
      { id: 7, title: "Sport Fashion", image: "https://cdn.prod.website-files.com/64891f720421491be3ec460b/64fb571286c378f03083cb55_Sport%20fashion%202.jpg" },
      { id: 8, title: "Steak Design", image: "https://cdn.prod.website-files.com/64891f720421491be3ec460b/665a0e9c367638fb440af3c3_steak%20design%201.jpg" },
      { id: 9, title: "Ads Layout", image: "https://cdn.prod.website-files.com/64891f720421491be3ec460b/687fb9d3b2160021b5f4f34b_Frame%20313292.jpg" }
    ],
  },
];
