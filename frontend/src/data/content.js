// Real content sourced from palmorama.in

export const BRAND = {
  name: "Palmorama",
  tagline: "Retreat Home",
  hero: {
    eyebrow: "Mandrem · Goa",
    title: "A tranquil farmhouse\nwoven into the wild.",
    subtitle: "Suites, a dome stay, and a natural pool — held quietly by the palms.",
  },
  phone: "+91 74101 13001",
  phoneRaw: "+917410113001",
  email: "palmorama.goa@gmail.com",
  address: "289, Dandoswada, Mandrem, Pernem, 403527",
  bookingUrl: "https://wa.me/917410113080?text=Hi%20Palmorama%2C%20I%27d%20like%20to%20book%20a%20stay.",
  whatsapp: "https://wa.me/917410113080?text=Hi%20Palmorama%2C%20I%27d%20like%20to%20book%20a%20stay.",
  social: {
    instagram: "https://instagram.com/palmorama",
    facebook: "https://facebook.com/palmorama",
  },
};

export const NAV = [
  { label: "Stay", href: "#stay" },
  { label: "Story", href: "#story" },
  { label: "Café", href: "#cafe" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "Srot", href: "#srot" },
  { label: "Contact", href: "#contact" },
];

export const HIGHLIGHTS = [
  "Spacious & comfortable suites",
  "A unique, cozy dome stay",
  "A refreshing natural pool",
  "Peaceful, nature-surrounded ambience",
  "Daily yoga in our Sacred Shala",
];

import { asset } from "./assets";

export { asset };

const img = (path) => asset(path);
const imgSm = (path) => asset(path);
const local = (path) => asset(path);

export const HERO_IMAGES = [
  img("img/about/1.jpg"),
  img("img/about/2.jpg"),
  img("img/gallery/3.jpg"),
];

export const ROOMS = [
  {
    id: "chandra-dome",
    name: "Chandra Dome",
    price: "\u20B93,500",
    occupancy: "for 2 guests",
    description:
      "A romantic geodesic dome cradled by palms — wake beneath a moonlit canopy and step out to garden quiet.",
    amenities: ["Free WiFi", "Kitchen", "Balcony", "Room service", "Daily housekeeping", "Toiletries"],
    images: [img("img/rooms/chandra-room.jpg"), img("img/rooms/chandra-dome-1.jpg"), img("img/rooms/chandra-dome-2.jpg")],
  },
  {
    id: "sunrise",
    name: "Sunrise · 1 Bedroom Kitchen",
    price: "\u20B94,000",
    occupancy: "for 2 guests",
    description:
      "Open your eyes to the first gold of morning. A bright suite with its own kitchen and a sunrise-facing balcony.",
    amenities: ["Free WiFi", "Kitchen", "Balcony", "Room service", "Daily housekeeping", "Toiletries"],
    images: [img("img/rooms/room-1.jpg"), img("img/gallery/7.jpg"), img("img/gallery/12.jpg")],
  },
  {
    id: "sunset",
    name: "Sunset · 1 Bedroom Kitchen",
    price: "\u20B94,000",
    occupancy: "for 2 guests",
    description:
      "End your day softly. A west-facing one-bedroom with a kitchen, balcony, and the warm hush of dusk light.",
    amenities: ["Free WiFi", "Kitchen", "Balcony", "Room service", "Daily housekeeping", "Toiletries"],
    images: [img("img/rooms/room-2.jpg"), img("img/gallery/9.jpg"), img("img/gallery/14.jpg")],
  },
  {
    id: "earth",
    name: "Earth · 2 Bedroom Kitchen",
    price: "\u20B97,000",
    occupancy: "for up to 4 guests",
    description:
      "A grounded family suite — two bedrooms, a kitchen, and gentle thresholds that open onto the garden.",
    amenities: ["Free WiFi", "Kitchen", "Balcony", "Room service", "Daily housekeeping", "Toiletries"],
    images: [img("img/rooms/room-3.jpg"), img("img/gallery/15.jpg"), img("img/gallery/18.jpg")],
  },
];

export const GALLERY = Array.from({ length: 24 }, (_, i) =>
  imgSm(`img/gallery/${i + 1}.jpg`)
);

export const TESTIMONIALS = [
  {
    name: "Maren Unger",
    role: "Guest review",
    body:
      "A super nice and pleasant stay at Palmorama \u2014 clean, quiet, beautiful, with attention to detail. Our highlights were the balcony sunrise, the cafe in the garden below, and all the lovely encounters. Yoga on the roof terrace, too. Thank you for the lovely stay.",
  },
  {
    name: "Emely B",
    role: "Guest review",
    body:
      "The property is impeccably clean and surrounded by lush palm trees, truly living up to its name. Dinner here was absolutely delicious. We also saw a new room being built for moonlit views \u2014 a one-of-a-kind addition in Goa.",
  },
  {
    name: "Romain Renardy",
    role: "Guest review",
    body:
      "This area and hotel are jewelry. Rooms are organic and gorgeous, such a home feeling. The host Rekish is a big-heart man \u2014 warm welcoming and takes good care. A little paradise, very well located.",
  },
  {
    name: "Amant Sodhi",
    role: "Guest review",
    body:
      "One of the standout features is the incredible food. The meals provided are delicious, with a variety of options. The host was very attentive and made sure all my needs were met promptly. Highly recommended.",
  },
  {
    name: "Prith Singh",
    role: "Guest review",
    body:
      "Palmorama is a serene and beautiful retreat, perfect for a relaxing getaway. The staff is friendly and attentive. Rooms are well-maintained, combining comfort and luxury.",
  },
];

export const ATTRACTIONS = [
  {
    title: "Mandrem Beach",
    eyebrow: "Nearby attraction",
    body:
      "A serene and less crowded beach known for its golden sand, clear waters, and scenic beauty \u2014 ideal for relaxation, yoga, and long walks, with famous sunset views.",
    image: img("img/attractions/1.jpg"),
  },
  {
    title: "Arambol Beach",
    eyebrow: "Nearby attraction",
    body:
      "A lively destination loved by backpackers and free-spirited travelers \u2014 live music, drum circles, local markets, a freshwater lake, and adventure like paragliding and surfing.",
    image: img("img/attractions/2.jpg"),
  },
  {
    title: "Ashwem Beach",
    eyebrow: "Nearby attraction",
    body:
      "Pristine shoreline and tranquil environment. Less commercialised, with calm swimmable waves and a string of chic beachside cafes serving fresh seafood.",
    image: img("img/attractions/3.jpg"),
  },
];

export const CAFE = {
  title: "The Café in the Garden",
  eyebrow: "On the property",
  body:
    "Slow mornings open with coffee under the palms. Through the day, the kitchen turns out honest, seasonal plates \u2014 the sort of food guests describe as feeling like home.",
  images: [
    local("/images/cafe/cafe-1.jpg"),
    local("/images/cafe/cafe-2.jpg"),
    local("/images/cafe/cafe-3.jpg"),
  ],
};

export const EXPERIENCES = [
  {
    title: "Daily Yoga in the Sacred Shala",
    body:
      "Begin each day on the roof terrace, where the shala holds space for breath, movement, and stillness above the palm canopy.",
    image: local("/images/experiences/yoga.jpg"),
  },
  {
    title: "The Natural Pool",
    body:
      "A pool designed with the land, not against it \u2014 a quiet place to drift, read, and feel the afternoon slow.",
    image: local("/images/experiences/pool.jpg"),
  },
  {
    title: "Garden Suppers",
    body:
      "Evenings unfold under fairy-lit trees with seasonal menus, soft music, and unhurried conversation.",
    image: local("/images/experiences/garden-supper.jpg"),
  },
];
