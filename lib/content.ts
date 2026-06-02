export const services = [
  {
    number: "01",
    title: "Publishing & Distribution",
    description:
      "We publish your app, either on our own or with partners like Voodoo and Homa, and handle distribution across paid and organic channels.",
  },
  {
    number: "02",
    title: "Hybrid Growth",
    description:
      "Blended paid and organic user acquisition that makes your app stand out and scales installs efficiently.",
  },
  {
    number: "03",
    title: "Ideas & Market Insights",
    description:
      "AI-driven market analysis to identify trends, niche opportunities, and the next winning app concept.",
  },
  {
    number: "04",
    title: "Rapid Development",
    description:
      "In-house and co-development powered by AI and our best practices to ship fast without sacrificing quality.",
  },
  {
    number: "05",
    title: "TRBO Growth Engine",
    description:
      "Our internal operating system. AI tools and human-in-the-loop workflows that analyze, monitor, support, and optimize your app at a scale not possible without our own tooling.",
  },
  {
    number: "06",
    title: "Competitive & Product Analysis",
    description:
      "Measure, tweak, and optimize every aspect of your app against recommended KPIs and market benchmarks.",
  },
  {
    number: "07",
    title: "Data-Driven Creatives",
    description:
      "AI and human creatives working hand in hand. We generate, refine, and A/B test ad creatives and ASO assets together to find what delivers the best value.",
  },
];

export const growthEngineModules = [
  {
    name: "Market Radar",
    description: "Track category trends, competitor moves, and niche opportunities before you build or scale.",
  },
  {
    name: "Creative Factory",
    description: "Generate, refine, and test ad creatives and ASO assets with AI and human review in the loop.",
  },
  {
    name: "UA Experimentation",
    description: "Run structured paid and organic tests to find channels and messages that convert.",
  },
  {
    name: "ASO + Store Optimization",
    description: "Improve store listings, keywords, and screenshots based on data, not guesswork.",
  },
  {
    name: "Retention / LTV Dashboard",
    description: "Monitor D1, D7, and D28 retention alongside revenue signals to guide product and growth decisions.",
  },
  {
    name: "AI Product Analysis",
    description: "Use AI-assisted review of funnels, onboarding, and engagement to spot what to fix next.",
  },
  {
    name: "Human-in-the-loop Review",
    description: "Operator judgment on every major decision. AI speeds the work and humans own the call.",
  },
];

export const processSteps = [
  { step: "01", title: "Submit", description: "Share your app, stage, links, and vision." },
  { step: "02", title: "Review", description: "We validate whether you meet our bar." },
  { step: "03", title: "Publisher test", description: "Accepted apps enter an initial publishing test." },
  { step: "04", title: "Agreement", description: "Qualified apps move to a publishing agreement." },
  { step: "05", title: "Publish & grow", description: "We publish and run hybrid growth strategies for you." },
];

export const whyTrbo = [
  "Publisher-first with real distribution muscle across paid and organic channels",
  "Our Growth Engine blends AI with human-in-the-loop expertise at every stage",
  "Scale your product beyond typical publishing reach with tooling built in-house",
  "We invest our own capital in user acquisition",
  "Flexible publishing: self-published or with Supercent, Voodoo, and Homa",
  "In-house and co-development. A cleaner model than typical agencies",
];

export const audiencePaths = [
  {
    title: "For app founders",
    description: "Have a consumer app or game? Submit it for a publishing test and tell us where you are today.",
    cta: "Submit your app",
    href: "/publish",
  },
  {
    title: "For publishers & partners",
    description: "Explore our portfolio, case studies, and reach out about strategic partnerships or co-publishing.",
    cta: "Partner with TRBO",
    href: "/contact",
  },
];

export const marketingToolsSection = {
  label: "TRBO Labs",
  title: "Internal tools we build and dogfood",
  description:
    "Products we build to test growth ideas in production. More labs are on the way as we expand the TRBO platform.",
};

export const marketingTools = [
  {
    name: "ConvertRoute",
    tagline: "AI quiz funnels",
    description:
      "An AI quiz funnel builder for apps and websites. Ask smart questions, personalize each visit, and turn traffic into leads and sign-ups.",
    href: "https://convertroute.com/",
  },
];

export const caseStudies = [
  {
    slug: "city-connect",
    name: "City Connect",
    partner: "TRBO (self-published)",
    headline: "First 100K downloads driven by TRBO",
    problem:
      "A relaxing idle transport sim needed distribution and store positioning to reach its first meaningful user base.",
    trboRole: [
      "Self-published and ran initial UA experiments",
      "Optimized store listing and ASO assets",
      "Tested paid and organic channels to find early traction",
      "Iterated on onboarding based on retention signals",
    ],
    result: "100K+ downloads",
    rating: "First 100K driven by us",
    icon: "/games/city-connect-play.jpg",
    appStore: "https://apps.apple.com/us/app/city-connect-idle-simulation/id6759379721",
    playStore:
      "https://play.google.com/store/apps/details?id=com.aredstudio.cityconnect.relax.story.connect.idle.simulation.management.country.state",
  },
  {
    slug: "beach-resort-supercent",
    name: "My Beach Resort & Beach Hotel Simulator 3D",
    partner: "Supercent",
    headline: "500K+ installs across two Supercent collaborations",
    problem:
      "Two beach-themed simulation titles needed partner publishing muscle and hybrid growth to scale beyond initial traction.",
    trboRole: [
      "Co-developed and published with Supercent",
      "Ran creative testing and UA support alongside partner distribution",
      "Optimized store assets and genre positioning for idle/sim audiences",
      "Scaled installs while maintaining strong App Store ratings",
    ],
    result: "500K+ installs and 4.7 to 4.9 App Store ratings",
    rating: "Supercent collaboration",
    icon: "/games/my-beach-resort-play.jpg",
    icons: ["/games/my-beach-resort-play.jpg", "/games/beach-hotel-simulator.jpg"],
    appStore: "https://apps.apple.com/us/app/my-beach-resort/id6636534055",
    playStore: "https://play.google.com/store/apps/details?id=com.aredstudio.beachresort",
  },
  {
    slug: "felt",
    name: "Felt: AI Journal Buddy",
    partner: "Owned Product Lab",
    headline: "TRBO's AI-native consumer app in production",
    problem:
      "TRBO needed a live product to test AI personalization, retention loops, and companion-style UX in a real consumer app.",
    trboRole: [
      "Built and shipped Felt as an owned TRBO product",
      "Tested AI journaling, mood tracking, and Mentora personalization",
      "Validated retention and engagement patterns for future TRBO apps",
      "Proved AI plus product judgment in a non-gaming consumer category",
    ],
    result: "Live on the App Store with growing ratings",
    rating: "Owned Product Lab",
    icon: "/felt/felt-image.webp",
    appStore: "https://apps.apple.com/us/app/felt-ai-journal-buddy/id6469459271",
    playStore: undefined,
    productPage: "/felt",
  },
];

export const founderSection = {
  label: "Leadership",
  title: "Built by operators, not consultants",
  description:
    "TRBO is led by people who build, ship, and scale consumer apps every day, not slide decks about them. Follow founder Mostafa on LinkedIn or X (@mostafawmg).",
  bullets: [
    "AI Engineer at Microsoft focused on distributed systems, AI infrastructure, and agents",
    "Mobile apps and games portfolio with 2M+ downloads across 16+ apps",
    "Hands-on UA, creative testing, analytics, and publishing partnerships",
  ],
};

export const faqs = [
  {
    question: "What types of apps does TRBO accept?",
    answer:
      "We focus on consumer apps and games with clear category fit, a playable or live build, and signals that the product can scale with the right publishing and growth support. Submit your app with stage, links, and any metrics you have. We review every submission against our bar.",
  },
  {
    question: "Do you invest in UA?",
    answer:
      "Yes. For accepted apps we run structured UA experiments and hybrid paid plus organic growth. We invest our own capital in user acquisition when the product and partnership model fit.",
  },
  {
    question: "Do you work on revenue share?",
    answer:
      "Yes. Qualified apps that pass our publisher test can move to a publishing agreement, often on a revenue-share basis. Tell us on the submit form if you are open to that model.",
  },
  {
    question: "Do you co-develop apps?",
    answer:
      "Yes. We co-develop with partners like Supercent, Voodoo, and Homa, and we also build and publish our own titles. The right path depends on your app, stage, and goals.",
  },
  {
    question: "How long does the publisher test take?",
    answer:
      "Initial assessment typically takes 1 to 2 weeks. Accepted apps enter a publisher test before a full agreement. Timelines after that depend on app readiness and scope.",
  },
];
