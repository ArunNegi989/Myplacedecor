import { IMG, img } from "./images";

export const SITE = {
  name: "Acumen Interiors",
  phone: "+91 82220 22202",
  phoneHref: "tel:+918222022202",
  address: "Opposite AIPL Lake City, Gurugram, India",
  hours: "Open 24/7",
  rating: "4.9",
  reviewCount: 545,
  // Replace with your real links
  googleReviews: "https://www.google.com/maps",
  youtube: "https://www.youtube.com",
  social: {
    instagram: "https://www.instagram.com",
    facebook: "https://www.facebook.com",
    pinterest: "https://www.pinterest.com",
    linkedin: "https://www.linkedin.com",
    youtube: "https://www.youtube.com",
  },
};

/** Header nav — one real page per item (static export, each page = its own HTML file). */
export const NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Contact Us", href: "/contact/" },
];

export const HERO_SLIDES = [
  { src: img(IMG.bedroom, 1400), label: "Serene Master Bedroom" },
  { src: img(IMG.livingSage, 1400), label: "Sage Living Lounge" },
  { src: img(IMG.kitchen, 1400), label: "Modular Kitchen" },
  { src: img(IMG.bathroom, 1400), label: "Marble Bathroom" },
];

export const CATEGORIES = [
  { label: "Living Spaces", src: img(IMG.livingBright, 160) },
  { label: "Modular Kitchens", src: img(IMG.kitchen, 160) },
  { label: "Luxury Bathrooms", src: img(IMG.bathroomAlt, 160) },
  { label: "Custom Furniture", src: img(IMG.furniture, 160) },
  { label: "Wardrobes", src: img(IMG.wardrobe, 160) },
  { label: "Commercial", src: img(IMG.office, 160) },
];

// Placeholder clip for every tile. Swap `video` for your own MP4 / hosted file.
const DEMO_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";
export const VIDEOS = [
  { title: "Reception Area Walkthrough", tag: "Commercial", poster: img(IMG.officeAlt, 1200), video: DEMO_VIDEO },
  { title: "Bedroom Walkthrough", tag: "Residential", poster: img(IMG.bedroomAlt, 1200), video: DEMO_VIDEO },
  { title: "Living Room Reveal", tag: "Residential", poster: img(IMG.livingWarm, 1200), video: DEMO_VIDEO },
  { title: "Kitchen Transformation", tag: "Modular", poster: img(IMG.kitchenAlt, 1200), video: DEMO_VIDEO },
  { title: "Spa-style Bathroom", tag: "Luxury", poster: img(IMG.bathroom, 1200), video: DEMO_VIDEO },
  { title: "Studio Office Tour", tag: "Commercial", poster: img(IMG.office, 1200), video: DEMO_VIDEO },
];

export const ABOUT_STATS = [
  { value: 250, suffix: "+", label: "Projects Completed", icon: "home" },
  { value: 120, suffix: "+", label: "Happy Clients", icon: "users" },
  { value: 15, suffix: "+", label: "Years Experience", icon: "clock" },
  { value: 20, suffix: "+", label: "Design Awards", icon: "award" },
] as const;

export const ABOUT_IMAGES = [
  img(IMG.livingSage, 900),
  img(IMG.interior, 700),
  img(IMG.bathroomAlt, 700),
  img(IMG.wardrobe, 700),
];

export const SERVICES = [
  {
    title: "Residential Design",
    desc: "Elegant & comfortable spaces for modern living.",
    icon: "home",
    image: img(IMG.livingSage, 1000),
    tags: ["Apartments", "Villas", "Space planning"],
  },
  {
    title: "Commercial Design",
    desc: "Functional & inspiring workspaces that reflect your brand.",
    icon: "building",
    image: img(IMG.office, 1000),
    tags: ["Offices", "Retail", "Hospitality"],
  },
  {
    title: "Turnkey Solutions",
    desc: "End-to-end design & execution made hassle-free.",
    icon: "key",
    image: img(IMG.kitchenAlt, 1000),
    tags: ["3D visuals", "Site execution", "Handover"],
  },
  {
    title: "Custom Furniture",
    desc: "Bespoke furniture crafted around your style and space.",
    icon: "armchair",
    image: img(IMG.furniture, 1000),
    tags: ["Wardrobes", "Wall units", "Seating"],
  },
] as const;

export const PROJECTS = [
  { title: "Modern Minimal Living Space", category: "Living", image: img(IMG.livingWarm, 900) },
  { title: "Luxury Marble Bathroom", category: "Bathroom", image: img(IMG.bathroom, 900) },
  { title: "Contemporary TV Lounge", category: "Living", image: img(IMG.lounge, 900) },
  { title: "Sage & Oak Master Suite", category: "Bedroom", image: img(IMG.bedroom, 900) },
  { title: "Handle-less Modular Kitchen", category: "Kitchen", image: img(IMG.kitchen, 900) },
  { title: "Walk-in Wardrobe Gallery", category: "Wardrobe", image: img(IMG.wardrobe, 900) },
];

// Real Google reviews shown on the existing site. Update from your own data.
export const REVIEWS = [
  {
    name: "Satyjeet Singh",
    text: "The team at Acumen Interiors is very professional and creative. They designed our home in a way that feels elegant but still comfortable for everyday life. The storage planning especially was very thoughtful.",
  },
  {
    name: "Krishan Rana",
    text: "Choosing Acumen Interiors was one of the best decisions for our interior project. Their experienced team delivered exceptional quality, modern designs, and timely completion. Truly a trustworthy and professional interior design company.",
    featured: true,
  },
  {
    name: "Bharti Tyagi",
    text: "Very happy with the work done by Acumen Interiors. They helped us design our 3BHK and made the whole process surprisingly stress-free. The house feels much more spacious and organized now.",
  },
  {
    name: "Jigyasa Mishra",
    text: "We worked with Acumen Interiors for our home interiors and it turned out beautifully. The team had great design ideas but were also practical about budgets and timelines. Everything was delivered on time.",
  },
  {
    name: "Deeksha Agarwal",
    text: "Really impressed with the work by Acumen Interiors. They handled everything from layout planning to materials and finishing. The house now feels brighter, more spacious, and much more functional.",
  },
  {
    name: "Ankit Vaishnav",
    text: "Great experience working with Acumen Interiors they understood our style quickly and suggested a design that felt modern but not overdone. The entire process from planning to execution was smooth.",
  },
];

export const WHY_POINTS = [
  "Personalized Design Solutions",
  "Quality Craftsmanship",
  "Transparent Process",
  "On-Time Delivery",
  "End-to-End Execution",
  "After-Sales Support",
];

export const FOOTER_LINKS = {
  quick: NAV,
  services: [
    "Residential Design",
    "Commercial Design",
    "Turnkey Solutions",
    "Custom Furniture",
    "Space Planning",
  ],
};

export const WHY_BG = img(IMG.bathroomAlt, 1400);
export const CTA_BG = img(IMG.livingModern, 1800);
export const NEWSLETTER_BG = img(IMG.interior, 1000);

/** Extra detail shown on the /services page (keyed by SERVICES title). */
export const SERVICE_DETAILS: Record<string, { points: string[] }> = {
  "Residential Design": {
    points: ["Full-home & single-room interiors", "Space planning and 3D visuals", "Lighting, colour and material curation"],
  },
  "Commercial Design": {
    points: ["Offices, clinics, retail and cafés", "Brand-led layouts and zoning", "Fast-track execution to cut downtime"],
  },
  "Turnkey Solutions": {
    points: ["Design, civil, electrical, carpentry — one team", "Fixed timelines with weekly site updates", "Snagging and clean handover"],
  },
  "Custom Furniture": {
    points: ["Wardrobes, wall units, beds and study desks", "Made-to-measure in-house carpentry", "Premium hardware and finishes"],
  },
};

export const PROCESS_STEPS = [
  { title: "Consultation", desc: "We listen to your needs, lifestyle, budget and timeline." },
  { title: "Concept & 3D", desc: "Layouts, mood boards and realistic 3D views of your space." },
  { title: "Execution", desc: "Skilled site teams build to the approved design, on schedule." },
  { title: "Handover", desc: "Final styling, quality checks and after-sales support." },
] as const;
