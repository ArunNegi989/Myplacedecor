import { IMG, img } from "./images";

/**
 * Portfolio page content. Everything here is static — swap any Unsplash `id`
 * for your own photo, or the video URL for a hosted walkthrough of your work.
 */

// Free stock clip from Pexels: "Modern Luxury Interiors with Spacious Design" (1080p, ~7.6 MB)
// https://www.pexels.com/video/modern-luxury-interiors-with-spacious-design-31617692/
export const PORTFOLIO_VIDEO = {
  src: "https://videos.pexels.com/video-files/31617692/13470975_1920_1080_24fps.mp4",
  poster: img(IMG.livingModern, 1920),
};

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Living Room",
  "Kitchen",
  "Bathroom",
  "Bedroom",
  "Wardrobe",
  "Commercial",
  "Custom Furniture",
] as const;

export type PortfolioCategory = Exclude<(typeof PORTFOLIO_CATEGORIES)[number], "All">;

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  /** Card-sized image */
  thumb: string;
  /** Large image for the lightbox */
  full: string;
  alt: string;
};

const item = (id: string, title: string, category: PortfolioCategory, alt: string): PortfolioItem => ({
  id,
  title,
  category,
  thumb: img(id, 900),
  full: img(id, 2000),
  alt,
});

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  item(IMG.livingSage, "Sage & Oak Living Lounge", "Living Room", "Living room with grey sofa, leather ottomans and a wooden coffee table"),
  item(IMG.bedroom, "Channel-Tufted Master Suite", "Bedroom", "Master bedroom with a channel-tufted bed, brass chandelier and dark feature wall"),
  item("1556912172-45b7abe8b7e1", "Walnut Island Kitchen", "Kitchen", "White kitchen with a walnut-clad island, quartz top and leather bar stools"),
  item("1620626011761-996317b8d101", "Freestanding Tub Spa Bathroom", "Bathroom", "Bright bathroom with a freestanding bathtub, vessel basin and indoor plants"),
  item("1618219908412-a29a1bb7b86e", "Rattan Console & Round Mirror", "Custom Furniture", "Custom rattan-front console with a round mirror and pendant light"),
  item(IMG.office, "Corporate Office Corridor", "Commercial", "Long office corridor with glass cabins and a slatted ceiling"),
  item("1600210491892-03d54c0aaf87", "Arched-Window Family Room", "Living Room", "Family room with exposed wooden beams, arched windows and a fireplace"),
  item(IMG.wardrobe, "Open-Shelf Linen Unit", "Wardrobe", "Wall-mounted oak storage unit with open cubbies against a blush wall"),
  item("1565538810643-b5bdb714032a", "Brass & Quartz Kitchen", "Kitchen", "Kitchen with taupe cabinets, brass faucet and white quartz counter"),
  item("1617104678098-de229db51175", "Charcoal Wall Master Bedroom", "Bedroom", "Bedroom with a charcoal feature wall, bench and floor-to-ceiling window"),
  item("1517248135467-4c7edcad34c4", "Warm-Lit Fine Dining Restaurant", "Commercial", "Restaurant interior with timber slats, warm lighting and dark dining chairs"),
  item(IMG.bathroom, "Glass-Enclosed Shower Suite", "Bathroom", "Bathroom with a glass shower enclosure, floating shelves and dark vanity"),
  item("1616486338812-3dadae4b4ace", "Soft Neutral Sectional Lounge", "Living Room", "Neutral living room with a sectional sofa, round table and wall decor"),
  item(IMG.furniture, "Emerald Velvet Sofa", "Custom Furniture", "Emerald green velvet sofa on a light oak floor"),
  item("1631049307264-da0ec9d70304", "Hotel-Style Guest Bedroom", "Bedroom", "Guest bedroom with a tall upholstered headboard and plaid throw"),
  item("1558997519-83ea9252edf8", "Teak Two-Door Wardrobe", "Wardrobe", "Freestanding teak wardrobe with two doors and slim handles"),
  item("1497366811353-6870744d04b2", "Loft Conference Studio", "Commercial", "Loft-style office with a long conference table and glass walls"),
  item(IMG.kitchen, "Handle-less Modular Kitchen", "Kitchen", "Modular kitchen with white handle-less shutters and marble counter"),
  item(IMG.livingModern, "Open-Plan Modern Living", "Living Room", "Open-plan living area with grey sofa flowing into the kitchen"),
  item("1505693416388-ac5ce068fe85", "Tufted Headboard Retreat", "Bedroom", "Bedroom with a tufted headboard, upholstered bench and table lamps"),
  item("1567538096630-e0c55bd6374c", "Tufted Accent Chair", "Custom Furniture", "Ivory tufted accent chair with turned white legs"),
  item(IMG.officeAlt, "Lounge-Style Breakout Zone", "Commercial", "Office breakout area with lounge chairs and arc floor lamps"),
  item("1552321554-5fefe8c9ef14", "Garden-Light Powder Room", "Bathroom", "White powder room with pedestal basin and hanging plants"),
];

export const PORTFOLIO_CTA_BG = img("1600573472550-8090b5e0745e", 1800);
