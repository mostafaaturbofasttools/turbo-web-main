export type Partner = "Supercent" | "Voodoo" | "Homa";

export type Game = {
  slug: string;
  name: string;
  genre: string;
  blurb: string;
  icon: string;
  screenshot?: string;
  appStore?: string;
  playStore?: string;
  partner?: Partner;
  featured?: boolean;
  showcase?: boolean;
  stats?: string;
  mockupVariant?: "screenshot" | "icon";
};
export const games: Game[] = [
  {
    slug: "beach-hotel-simulator",
    name: "Beach Hotel Simulator 3D",
    genre: "Simulation",
    blurb:
      "Build and manage a stunning beachside hotel empire. Upgrade rooms, attract guests, and grow from a cozy inn into a 5-star luxury resort.",
    icon: "/games/beach-hotel-simulator.jpg",
    appStore: "https://apps.apple.com/us/app/beach-hotel-simulator-3d/id6746117443",
    playStore: "https://play.google.com/store/apps/details?id=com.aredstudio.hotelsimulator",
    partner: "Supercent",
    featured: true,
    stats: "500K+ installs · 4.7 rating",
  },
  {
    slug: "my-beach-resort",
    name: "My Beach Resort",
    genre: "Idle Management",
    blurb:
      "From sun loungers to private yachts, design and run the ultimate tropical beach resort in this relaxing offline management sim.",
    icon: "/games/my-beach-resort-play.jpg",
    appStore: "https://apps.apple.com/us/app/my-beach-resort/id6636534055",
    playStore: "https://play.google.com/store/apps/details?id=com.aredstudio.beachresort",
    partner: "Supercent",
    featured: true,
    stats: "500K+ installs · 4.9 rating",
  },
  {
    slug: "city-connect",
    name: "City Connect",
    genre: "Idle Simulation",
    blurb:
      "Design and manage a global transport network. Connect cities, grow states, and build a traffic empire in this relaxing strategy experience.",
    icon: "/games/city-connect-play.jpg",
    appStore: "https://apps.apple.com/us/app/city-connect-idle-simulation/id6759379721",
    playStore:
      "https://play.google.com/store/apps/details?id=com.aredstudio.cityconnect.relax.story.connect.idle.simulation.management.country.state",
    featured: true,
    stats: "100K+ downloads · self-published by TRBO",
  },
  {
    slug: "ant-kingdom",
    name: "Ant Kingdom",
    genre: "Strategy · RPG",
    blurb:
      "Lead your ant colony to glory! Build tunnels, recruit warriors, and conquer rival colonies in this addictive strategy RPG.",
    icon: "/games/ant-kingdom.jpg",
    appStore: "https://apps.apple.com/us/app/ant-kingdom-wild-rpg/id6748462417",
    playStore: "https://play.google.com/store/apps/details?id=com.aredstudio.antkingdom",
    partner: "Supercent",
    showcase: true,
  },
  {
    slug: "army-invasion",
    name: "Army Invasion: Idle RPG",
    genre: "Idle · RPG",
    blurb:
      "Command your forces, upgrade your army, and launch relentless invasions in this addictive idle RPG battle strategy game.",
    icon: "/games/army-invasion.jpg",
    playStore: "https://play.google.com/store/apps/details?id=com.aredstudio.armyinvasion",
    partner: "Supercent",
    showcase: true,
  },
  {
    slug: "super-chess",
    name: "Super Chess",
    genre: "Strategy",
    blurb:
      "Classic chess meets modern mobile: beautiful board, smart AI opponents, and fast-paced games designed for players of all levels.",
    icon: "/games/super-chess.jpg",
    playStore: "https://play.google.com/store/apps/details?id=com.aredstudio.superchess",
    partner: "Supercent",
    showcase: true,
  },
  {
    slug: "dice-soldier",
    name: "Dice Soldier: Mystery Castle",
    genre: "RPG · Board",
    blurb:
      "Roll dice, move your soldier, and battle through mystery castle dungeons in this unique blend of board game strategy and RPG adventure.",
    icon: "/games/dice-soldier.jpg",
    playStore: "https://play.google.com/store/apps/details?id=com.aredstudio.dicesoldier",
    partner: "Supercent",
    showcase: true,
  },
  {
    slug: "goods-swipe",
    name: "Goods Swipe: Sort Puzzle",
    genre: "Puzzle · Merge",
    blurb:
      "Swipe and sort colourful goods into the right shelves. A satisfying, brain-teasing merge puzzle that's easy to pick up and hard to put down.",
    icon: "/games/goods-swipe.jpg",
    playStore: "https://play.google.com/store/apps/details?id=com.aredstudio.goodsswipe.sortpuzzle",
  },
  {
    slug: "street-cafe",
    name: "Street Cafe",
    genre: "Cafe Tycoon",
    blurb:
      "Transform a street-side eatery into a globally celebrated restaurant chain. Hire cooks, upgrade your kitchen, and build the biggest cafe empire.",
    icon: "/games/street-cafe.jpg",
    playStore:
      "https://play.google.com/store/apps/details?id=com.aredstudio.streetcafe.food.cooking.tycoon.restaurant.idle.game.simulation",
  },
  {
    slug: "mint-heroes",
    name: "Mint Heroes",
    genre: "Strategy · Merge",
    blurb:
      "Merge heroes, build your squad, and battle through epic challenges in this fast-paced strategy game with a unique twist on hero collection.",
    icon: "/games/mint-heroes.jpg",
    playStore: "https://play.google.com/store/apps/details?id=com.aredstudio.mintheroes",
    partner: "Voodoo",
    showcase: true,
  },
  {
    slug: "desert-survival",
    name: "Desert Survival",
    genre: "Idle Survival",
    blurb:
      "Lead survivors through a scorching desert in this offline idle game set in an Arabic ancient empire theme. Build, expand, and conquer the sands.",
    icon: "/games/desert-survival.jpg",
    playStore: "https://play.google.com/store/apps/details?id=com.AredGameStudio.DesertSurvival",
    partner: "Homa",
    showcase: true,
  },
  {
    slug: "idle-family-adventure",
    name: "Idle Family Adventure",
    genre: "Merge Tycoon",
    blurb:
      "A merging tycoon with farm management. Upgrade your workers, ships, and land by merging resources. The more you merge, the more you earn.",
    icon: "/games/idle-family-adventure.jpg",
    playStore: "https://play.google.com/store/apps/details?id=com.aredstudio.idle.merge.farm.game.idlefarmadventure",
  },
  {
    slug: "cook-more",
    name: "Cook More",
    genre: "Idle Tycoon",
    blurb:
      "Start with one chef and build a cooking empire. Hire more staff, unlock recipes, and become the biggest food tycoon in this idle simulator.",
    icon: "/games/cook-more.jpg",
    playStore:
      "https://play.google.com/store/apps/details?id=com.aredstudio.cookmore.simulation.idle.restaurant.cooking.food.tycoon.tap",
  },
  {
    slug: "color-ball-maze",
    name: "Color Ball Maze",
    genre: "Puzzle",
    blurb:
      "Guide colourful balls through tricky mazes, avoid obstacles, and match the right colours to the right exits in this satisfying brain teaser.",
    icon: "/games/color-ball-maze.jpg",
    playStore: "https://play.google.com/store/apps/details?id=com.aredstudio.collorballmaze",
  },
  {
    slug: "island-survival",
    name: "Island Survival",
    genre: "Survival",
    blurb:
      "Stranded on a tropical island, you must gather resources, build a shelter, and find a way home in this offline survival adventure.",
    icon: "/games/island-survival.jpg",
    playStore: "https://play.google.com/store/apps/details?id=com.aredgamestudio.IslandSurvival",
  },
];

const primaryShowcaseOrder = ["ant-kingdom", "army-invasion", "super-chess", "dice-soldier"] as const;
const partnerShowcaseOrder = ["mint-heroes", "desert-survival"] as const;

export const featuredGames = games.filter((g) => g.featured);
export const primaryShowcaseGames = primaryShowcaseOrder
  .map((slug) => games.find((g) => g.slug === slug))
  .filter((g): g is Game => Boolean(g));
export const partnerShowcaseGames = partnerShowcaseOrder
  .map((slug) => games.find((g) => g.slug === slug))
  .filter((g): g is Game => Boolean(g));
