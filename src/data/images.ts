/**
 * Placeholder images (Unsplash). Replace any `id` with your own asset by
 * swapping `img()` for a local path such as "/images/hero-1.jpg".
 */
export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const IMG = {
  bedroom: "1616594039964-ae9021a400a0",
  livingSage: "1618221195710-dd6b41faaea6",
  livingWarm: "1600210492486-724fe5c67fb0",
  livingBright: "1586023492125-27b2c045efd7",
  livingModern: "1600607687939-ce8a6c25118c",
  kitchen: "1556911220-bff31c812dba",
  kitchenAlt: "1600585154340-be6161a56a0c",
  bathroom: "1584622650111-993a426fbf0a",
  bathroomAlt: "1631679706909-1844bbd07221",
  furniture: "1555041469-a586c61ea9bc",
  bedroomAlt: "1540518614846-7eded433c457",
  office: "1497366216548-37526070297c",
  officeAlt: "1524758631624-e2822e304c36",
  wardrobe: "1595428774223-ef52624120d2",
  lounge: "1505691938895-1758d7feb511",
  interior: "1600121848594-d8644e57abab",
} as const;
