import { IMG, img } from "./images";

/**
 * Portfolio content — the single source for the /portfolio gallery AND the
 * homepage "Our projects" section. Everything here is static: swap any
 * Unsplash id for your own photo, or the video URL for a hosted walkthrough.
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

export type ProjectImage = {
  /** Card-sized image */
  thumb: string;
  /** Large image for the gallery */
  full: string;
  alt: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  /**
   * Every photo of this one project, cover first (at least four). The card slider
   * and the gallery both show exactly these, on the homepage and /portfolio alike.
   */
  images: [ProjectImage, ProjectImage, ProjectImage, ProjectImage, ...ProjectImage[]];
};

/** One photo from Unsplash. For your own files use `{ thumb: "/assets/projects/x.jpg", full: "/assets/projects/x.jpg", alt }`. */
const photo = (unsplashId: string, alt: string): ProjectImage => ({
  thumb: img(unsplashId, 900),
  full: img(unsplashId, 2000),
  alt,
});

/**
 * Each project's first photo is its original cover; the next three are temporary
 * placeholders (Spacejoy / Collov / Unsplash renders picked to match that project's
 * room and style, never shared between projects). Swap them for the real site photos
 * when they arrive — the cards, photo counts, card slider and gallery all pick them up:
 *
 *   images: [photo(IMG.kitchen, "Kitchen overview"), photo("<id>", "Close-up of the brass handles"), ...],
 */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "sage-oak-living-lounge",
    title: "Sage & Oak Living Lounge",
    category: "Living Room",
    images: [
      photo(IMG.livingSage, "Living room with grey sofa, leather ottomans and a wooden coffee table"),
      photo("1634547476021-c1155c01616c", "Wide view of twin cream sofas around a reclaimed-oak block coffee table"),
      photo("1633505899118-4ca6bd143043", "Oak coffee table and jute poufs in front of tall sunlit windows"),
      photo("1632829882891-5047ccc421bc", "Seating corner with framed neutral art, table lamp and olive tree"),
    ],
  },
  {
    id: "channel-tufted-master-suite",
    title: "Channel-Tufted Master Suite",
    category: "Bedroom",
    images: [
      photo(IMG.bedroom, "Master bedroom with a channel-tufted bed, brass chandelier and dark feature wall"),
      photo("1616594136787-28732f588083", "Upholstered grey bed with a crystal chandelier and faux-fur bench"),
      photo("1616594092403-fb65629b0a46", "Head-on view of the tufted headboard flanked by matching lamps"),
      photo("1617098900591-3f90928e8c54", "Bedside detail with dark nightstands, crystal pendant and framed art"),
    ],
  },
  {
    id: "walnut-island-kitchen",
    title: "Walnut Island Kitchen",
    category: "Kitchen",
    images: [
      photo("1556912172-45b7abe8b7e1", "White kitchen with a walnut-clad island, quartz top and leather bar stools"),
      photo("1512916194211-3f2b7f5f7de3", "Wood-veneer island with a black stone top and steel cooker hood"),
      photo("1759147960461-b74a7e9a75d4", "Timber island with bar stools against dark stone and lit display shelving"),
      photo("1502005097973-6a7082348e28", "Galley run of warm wood cabinets leading to garden doors"),
    ],
  },
  {
    id: "freestanding-tub-spa-bathroom",
    title: "Freestanding Tub Spa Bathroom",
    category: "Bathroom",
    images: [
      photo("1620626011761-996317b8d101", "Bright bathroom with a freestanding bathtub, vessel basin and indoor plants"),
      photo("1507652313519-d4e9174996dd", "Stone-finish freestanding tub on pebbles beside a potted palm"),
      photo("1733426107854-ee00a25d72a7", "Freestanding tub, walk-in shower and floor-length mirror in warm tones"),
      photo("1781344334947-60c704bafd51", "Wood vanity with vessel basins and a backlit round mirror"),
    ],
  },
  {
    id: "rattan-console-round-mirror",
    title: "Rattan Console & Round Mirror",
    category: "Custom Furniture",
    images: [
      photo("1618219908412-a29a1bb7b86e", "Custom rattan-front console with a round mirror and pendant light"),
      photo("1616046229478-9901c5536a45", "Cane-front media console under a round mirror with indoor plants"),
      photo("1618220179428-22790b461013", "Gold cane sideboard styled with a round mirror and orange armchair"),
      photo("1767963758785-b9def36c13e3", "Close-up of a fluted oak sideboard with a mushroom lamp"),
    ],
  },
  {
    id: "corporate-office-corridor",
    title: "Corporate Office Corridor",
    category: "Commercial",
    images: [
      photo(IMG.office, "Long office corridor with glass cabins and a slatted ceiling"),
      photo("1497366754035-f200968a6e72", "Corridor of black-framed glass cabins with a polished concrete floor"),
      photo("1774953037913-af0cf688491a", "Lounge seating along the glass-walled office corridor with a timber ceiling"),
      photo("1771678040857-51d00a11be7a", "Double-height white atrium with glass balustrades"),
    ],
  },
  {
    id: "modern-minimal-living-space",
    title: "Modern Minimal Living Space",
    category: "Living Room",
    images: [
      photo(IMG.livingWarm, "Sunlit living room with a tan leather sofa, white lounge chairs and a framed photo wall"),
      photo("1600210492493-0946911123ea", "Tan leather sectional and woven chair under a timber ceiling"),
      photo("1600210491369-e753d80a41f3", "White sofa with an ochre cushion beneath a gallery of black-and-white art"),
      photo("1600494448644-50b41080adbd", "Facing cream sofas around a pale wood coffee table"),
    ],
  },
  {
    id: "arched-window-family-room",
    title: "Arched-Window Family Room",
    category: "Living Room",
    images: [
      photo("1600210491892-03d54c0aaf87", "Family room with exposed wooden beams, arched windows and a fireplace"),
      photo("1600493504546-07f3cab212b1", "Cream sofa and console in front of a white brick fireplace"),
      photo("1600494448850-6013c64ba722", "Vaulted family room with paired sofas and a photo-grid wall"),
      photo("1600493504142-d4f9c15b2c51", "Leather lounge chairs around a round wooden coffee table"),
    ],
  },
  {
    id: "open-shelf-linen-unit",
    title: "Open-Shelf Linen Unit",
    category: "Wardrobe",
    images: [
      photo(IMG.wardrobe, "Wall-mounted oak storage unit with open cubbies against a blush wall"),
      photo("1758974782657-e5ada4b01c3c", "Low pale-wood unit with open cubbies under floating shelves"),
      photo("1577020914435-7ae6b1091ebd", "Folded linens on a lit shelf above a rail of hanging clothes"),
      photo("1629078691371-2c83d139c986", "White open shelving and hanging rail in a fitted closet"),
    ],
  },
  {
    id: "brass-quartz-kitchen",
    title: "Brass & Quartz Kitchen",
    category: "Kitchen",
    images: [
      photo("1565538810643-b5bdb714032a", "Kitchen with taupe cabinets, brass faucet and white quartz counter"),
      photo("1773579305267-8d75e0af5be4", "White quartz island with woven-back stools and brass pendants"),
      photo("1773579223066-4b54a17ec8cc", "Wider view of the kitchen with shaker cabinets and a brass faucet"),
      photo("1609347744403-2306e8a9ae27", "Marble waterfall island with rattan stools and open brass-bracket shelves"),
    ],
  },
  {
    id: "charcoal-wall-master-bedroom",
    title: "Charcoal Wall Master Bedroom",
    category: "Bedroom",
    images: [
      photo("1617104678098-de229db51175", "Bedroom with a charcoal feature wall, bench and floor-to-ceiling window"),
      photo("1618221823713-ca8c0e6c9992", "Bed against a charcoal wall with a brass chandelier and navy bench"),
      photo("1617099443741-a9b51eabd2b8", "Bedroom with black dresser, graphic art and a black-and-white rug"),
      photo("1617099401806-dce5517d517b", "Another angle of the black dresser, floor lamp and patterned rug"),
    ],
  },
  {
    id: "warm-lit-fine-dining-restaurant",
    title: "Warm-Lit Fine Dining Restaurant",
    category: "Commercial",
    images: [
      photo("1517248135467-4c7edcad34c4", "Restaurant interior with timber slats, warm lighting and dark dining chairs"),
      photo("1776763255189-3c8237aec808", "Rust-velvet booths and set tables under warm arched lighting"),
      photo("1667388969250-1c7220bf3f37", "Dining hall with a glowing coffered ceiling and brick walls"),
      photo("1765360773028-6affda725695", "White-linen tables beneath amber glass pendants"),
    ],
  },
  {
    id: "glass-enclosed-shower-suite",
    title: "Glass-Enclosed Shower Suite",
    category: "Bathroom",
    images: [
      photo(IMG.bathroom, "Bathroom with a glass shower enclosure, floating shelves and dark vanity"),
      photo("1696987007764-7f8b85dd3033", "Frameless glass shower beside a double vanity with stone counter"),
      photo("1651951646668-46562cfb4518", "Grey-tiled walk-in shower with a backlit mirror and wall-hung WC"),
      photo("1638799869566-b17fa794c4de", "Glass shower enclosure next to a white tub and walnut vanity"),
    ],
  },
  {
    id: "contemporary-tv-lounge",
    title: "Contemporary TV Lounge",
    category: "Living Room",
    images: [
      photo(IMG.lounge, "Cream sofa with teal cushions between two windows, under a large abstract painting"),
      photo("1618219788702-20a1ef509691", "Cream sofa with a teal cushion against a slate-grey wall"),
      photo("1631679893114-7957e44879db", "Wall-mounted TV above an oak dresser with a boucle lounge chair"),
      photo("1631701880095-373fb5f9a5f8", "TV wall with a walnut credenza and two mid-century armchairs"),
    ],
  },
  {
    id: "soft-neutral-sectional-lounge",
    title: "Soft Neutral Sectional Lounge",
    category: "Living Room",
    images: [
      photo("1616486338812-3dadae4b4ace", "Neutral living room with a sectional sofa, round table and wall decor"),
      photo("1617806215782-cf6e29e0fe36", "Grey sectional facing a fireplace with rattan accent chair"),
      photo("1617104752269-35a6674aad9f", "Chaise sectional with a round coffee table and framed map art"),
      photo("1616137422495-1e9e46e2aa77", "Taupe sofa and glass coffee table in a bright open lounge"),
    ],
  },
  {
    id: "emerald-velvet-sofa",
    title: "Emerald Velvet Sofa",
    category: "Custom Furniture",
    images: [
      photo(IMG.furniture, "Emerald green velvet sofa on a light oak floor"),
      photo("1759647020668-648cd90ddce4", "Close-up of plush green velvet cushions"),
      photo("1699901524286-41a46a4cd5c8", "Green velvet sofa with a marble coffee table on a vintage rug"),
      photo("1631510083755-11ecb5172d81", "Channel-tufted green velvet sofa with colourful cushions"),
    ],
  },
  {
    id: "hotel-style-guest-bedroom",
    title: "Hotel-Style Guest Bedroom",
    category: "Bedroom",
    images: [
      photo("1631049307264-da0ec9d70304", "Guest bedroom with a tall upholstered headboard and plaid throw"),
      photo("1618219629869-9ef11e2d7701", "Upholstered bed with framed prints and matching lamps"),
      photo("1618222499121-d6528f6d9d77", "Tufted headboard, bedside table and wooden bench"),
      photo("1618216252801-197dadf245f6", "Navy-trimmed headboard with white nightstands and floral art"),
    ],
  },
  {
    id: "teak-two-door-wardrobe",
    title: "Teak Two-Door Wardrobe",
    category: "Wardrobe",
    images: [
      photo("1558997519-83ea9252edf8", "Freestanding teak wardrobe with two doors and slim handles"),
      photo("1573311392049-4186e3a47e9c", "Two-door wardrobe opened to show hanging space and drawers"),
      photo("1778731660303-1fa5ede75477", "Fitted wardrobe interior with shelves, rail and drawers"),
      photo("1791140842017-ff731195de5c", "Warm-lit timber walk-in wardrobe with hanging rails"),
    ],
  },
  {
    id: "loft-conference-studio",
    title: "Loft Conference Studio",
    category: "Commercial",
    images: [
      photo("1497366811353-6870744d04b2", "Loft-style office with a long conference table and glass walls"),
      photo("1525896544042-354764aa27e6", "Meeting area with lounge chairs around small tables"),
      photo("1715593949273-09009558300a", "Cabin with a sculpted white desk and timber storage wall"),
      photo("1623177623442-979c1e42c255", "Standing desk workstation by a window"),
    ],
  },
  {
    id: "handle-less-modular-kitchen",
    title: "Handle-less Modular Kitchen",
    category: "Kitchen",
    images: [
      photo(IMG.kitchen, "Modular kitchen with white handle-less shutters and marble counter"),
      photo("1671197244266-73129c97c096", "Handle-less kitchen with a marble backsplash and lit glass uppers"),
      photo("1643949915134-73a4c880f7c7", "Cream handle-less drawers with under-cabinet lighting"),
      photo("1639751787355-bbc3ed1fd639", "Parallel handle-less kitchen with an integrated hob and sink"),
    ],
  },
  {
    id: "open-plan-modern-living",
    title: "Open-Plan Modern Living",
    category: "Living Room",
    images: [
      photo(IMG.livingModern, "Open-plan living area with grey sofa flowing into the kitchen"),
      photo("1618296498428-475b880e5b0a", "White sofa and nesting tables in front of an open kitchen"),
      photo("1617806168351-467743046acc", "Living area flowing into the dining zone"),
      photo("1600493504591-aa1849716b36", "Open-plan lounge with a round dining table beyond"),
    ],
  },
  {
    id: "tufted-headboard-retreat",
    title: "Tufted Headboard Retreat",
    category: "Bedroom",
    images: [
      photo("1505693416388-ac5ce068fe85", "Bedroom with a tufted headboard, upholstered bench and table lamps"),
      photo("1618221257490-1d703817596c", "Tufted bed with a round mirror and chaise by the window"),
      photo("1616486029423-aaa4789e8c9a", "Upholstered bed with a leather bench and gallery wall"),
      photo("1616137507072-f7276b168614", "Tan bench at the foot of a bed with sage linens"),
    ],
  },
  {
    id: "tufted-accent-chair",
    title: "Tufted Accent Chair",
    category: "Custom Furniture",
    images: [
      photo("1567538096630-e0c55bd6374c", "Ivory tufted accent chair with turned white legs"),
      photo("1579656592043-a20e25a4aa4b", "Green upholstered armchair with a wooden frame"),
      photo("1712926382189-dacbc6b89a01", "Woven-leather lounge chair with a sheepskin throw"),
      photo("1579656381229-15bdb188da49", "Tan leather armchair with a textured cushion"),
    ],
  },
  {
    id: "lounge-style-breakout-zone",
    title: "Lounge-Style Breakout Zone",
    category: "Commercial",
    images: [
      photo(IMG.officeAlt, "Office breakout area with lounge chairs and arc floor lamps"),
      photo("1587702068694-a909ef4aa346", "Glass-walled lobby lounge with leather sofas and armchairs"),
      photo("1758193783649-13371d7fb8dd", "Marble reception lobby with lounge seating"),
      photo("1758448500688-3ababa93fd67", "Reception desk and lounge chairs against timber panelling"),
    ],
  },
  {
    id: "garden-light-powder-room",
    title: "Garden-Light Powder Room",
    category: "Bathroom",
    images: [
      photo("1552321554-5fefe8c9ef14", "White powder room with pedestal basin and hanging plants"),
      photo("1771681278369-e2a5480b8c29", "Powder room with a marble shower wall, oak vanity and plants"),
      photo("1712214741533-3dd5b8013ca7", "Floating oak basin unit under a backlit oval mirror"),
      photo("1576698483491-8c43f0862543", "Vessel basin with brass tap against marble and a round mirror"),
    ],
  },
];

/** Projects shown in the homepage "Our projects" carousel, in order (ids from PORTFOLIO_ITEMS). */
const FEATURED_IDS = [
  "modern-minimal-living-space",
  "glass-enclosed-shower-suite",
  "contemporary-tv-lounge",
  "channel-tufted-master-suite",
  "handle-less-modular-kitchen",
  "open-shelf-linen-unit",
];

export const FEATURED_PROJECTS: PortfolioItem[] = FEATURED_IDS.map((id) => {
  const found = PORTFOLIO_ITEMS.find((p) => p.id === id);
  if (!found) throw new Error(`FEATURED_IDS: no portfolio item with id "${id}"`);
  return found;
});

export const PORTFOLIO_CTA_BG = img("1600573472550-8090b5e0745e", 1800);
