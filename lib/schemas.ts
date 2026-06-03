import { z } from "zod";

const optionalUrl = (label: string) =>
  z
    .string()
    .trim()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: `Enter a valid ${label} link starting with https:// (e.g. https://apps.apple.com/...)`,
    });

const optionalText = z.string().trim();

export const contactTopics = [
  { value: "app-publishing", label: "App publishing" },
  { value: "publisher-partnership", label: "Publisher partnership" },
  { value: "investment", label: "Investment or strategic partnership" },
  { value: "co-development", label: "Co-development" },
  { value: "growth-support", label: "Growth support" },
  { value: "press", label: "Press or media" },
  { value: "other", label: "Other" },
] as const;

const contactTopicValues = contactTopics.map((t) => t.value) as [
  (typeof contactTopics)[number]["value"],
  ...(typeof contactTopics)[number]["value"][],
];

export function contactTopicLabel(value: string): string {
  return contactTopics.find((t) => t.value === value)?.label ?? value;
}

export const publishHelpOptions = [
  { value: "publishing", label: "Publishing & distribution" },
  { value: "ua", label: "User acquisition / UA" },
  { value: "creatives", label: "Ad creatives & ASO" },
  { value: "product", label: "Product & retention" },
  { value: "co-dev", label: "Co-development" },
  { value: "other", label: "Other" },
] as const;

export const publishTeamSizes = [
  { value: "solo", label: "Solo" },
  { value: "2-5", label: "2–5" },
  { value: "6-10", label: "6–10" },
  { value: "11-50", label: "11–50" },
  { value: "50+", label: "50+" },
] as const;

/** App Store + Google Play categories combined for easier selection */
export const publishCategories = [
  { value: "games-action", label: "Games - Action" },
  { value: "games-adventure", label: "Games - Adventure" },
  { value: "games-arcade", label: "Games - Arcade" },
  { value: "games-board", label: "Games - Board" },
  { value: "games-card", label: "Games - Card" },
  { value: "games-casino", label: "Games - Casino" },
  { value: "games-casual", label: "Games - Casual" },
  { value: "games-puzzle", label: "Games - Puzzle" },
  { value: "games-racing", label: "Games - Racing" },
  { value: "games-rpg", label: "Games - Role Playing" },
  { value: "games-simulation", label: "Games - Simulation" },
  { value: "games-sports", label: "Games - Sports" },
  { value: "games-strategy", label: "Games - Strategy" },
  { value: "games-trivia", label: "Games - Trivia" },
  { value: "games-word", label: "Games - Word" },
  { value: "entertainment", label: "Entertainment" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "health-fitness", label: "Health & Fitness" },
  { value: "productivity", label: "Productivity" },
  { value: "education", label: "Education" },
  { value: "social", label: "Social" },
  { value: "photo-video", label: "Photo & Video" },
  { value: "music", label: "Music & Audio" },
  { value: "sports", label: "Sports" },
  { value: "finance", label: "Finance" },
  { value: "business", label: "Business" },
  { value: "shopping", label: "Shopping" },
  { value: "food-drink", label: "Food & Drink" },
  { value: "travel", label: "Travel & Navigation" },
  { value: "news", label: "News & Magazines" },
  { value: "books-reference", label: "Books & Reference" },
  { value: "utilities", label: "Utilities & Tools" },
  { value: "medical", label: "Medical" },
  { value: "weather", label: "Weather" },
  { value: "communication", label: "Communication" },
  { value: "dating", label: "Dating" },
  { value: "kids-family", label: "Kids & Family" },
  { value: "personalization", label: "Personalization" },
] as const;

const publishCategoryValues = publishCategories.map((c) => c.value) as [
  (typeof publishCategories)[number]["value"],
  ...(typeof publishCategories)[number]["value"][],
];

const publishTeamSizeValues = publishTeamSizes.map((t) => t.value) as [
  (typeof publishTeamSizes)[number]["value"],
  ...(typeof publishTeamSizes)[number]["value"][],
];

export type PublishFormValues = {
  appName: string;
  appDescription: string;
  category: string;
  teamSize: string;
  stage: string;
  traction: string;
  website: string;
  appStoreUrl: string;
  playStoreUrl: string;
  contactEmail: string;
  currentDownloads: string;
  d1Retention: string;
  d7Retention: string;
  monthlyRevenue: string;
  cpiCacTested: string;
  targetCountries: string;
  testFlightLink: string;
  helpNeeded: string[];
  revenueShareOpen: string;
};

export const emptyPublishFormValues: PublishFormValues = {
  appName: "",
  appDescription: "",
  category: "",
  teamSize: "",
  stage: "",
  traction: "",
  website: "",
  appStoreUrl: "",
  playStoreUrl: "",
  contactEmail: "",
  currentDownloads: "",
  d1Retention: "",
  d7Retention: "",
  monthlyRevenue: "",
  cpiCacTested: "",
  targetCountries: "",
  testFlightLink: "",
  helpNeeded: [],
  revenueShareOpen: "",
};

export function parsePublishFormValues(formData: FormData): PublishFormValues {
  const helpNeeded = formData.getAll("helpNeeded").map(String).filter(Boolean);
  return {
    appName: String(formData.get("appName") ?? "").trim(),
    appDescription: String(formData.get("appDescription") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    teamSize: String(formData.get("teamSize") ?? "").trim(),
    stage: String(formData.get("stage") ?? "").trim(),
    traction: String(formData.get("traction") ?? "").trim(),
    website: String(formData.get("website") ?? "").trim(),
    appStoreUrl: String(formData.get("appStoreUrl") ?? "").trim(),
    playStoreUrl: String(formData.get("playStoreUrl") ?? "").trim(),
    contactEmail: String(formData.get("contactEmail") ?? "").trim(),
    currentDownloads: String(formData.get("currentDownloads") ?? "").trim(),
    d1Retention: String(formData.get("d1Retention") ?? "").trim(),
    d7Retention: String(formData.get("d7Retention") ?? "").trim(),
    monthlyRevenue: String(formData.get("monthlyRevenue") ?? "").trim(),
    cpiCacTested: String(formData.get("cpiCacTested") ?? "").trim(),
    targetCountries: String(formData.get("targetCountries") ?? "").trim(),
    testFlightLink: String(formData.get("testFlightLink") ?? "").trim(),
    helpNeeded,
    revenueShareOpen: String(formData.get("revenueShareOpen") ?? "").trim(),
  };
}

export const publishFormSchema = z
  .object({
    appName: z.string().min(2, "App name is required"),
    appDescription: z.string().min(20, "Please describe your app"),
    category: z.enum(publishCategoryValues, { message: "Select a category" }),
    teamSize: z.enum(publishTeamSizeValues, { message: "Select team size" }),
    stage: z.enum(["idea", "prototype", "beta", "soft-launch", "live"], {
      message: "Select your app stage",
    }),
    traction: z
      .string()
      .min(10, "Tell us where the app is today (e.g. pre-launch, beta testers, or live traction)"),
    website: optionalUrl("website"),
    appStoreUrl: optionalUrl("App Store"),
    playStoreUrl: optionalUrl("Google Play"),
    contactEmail: z.string().email("Enter a valid email address (e.g. you@company.com)"),
    currentDownloads: optionalText,
    d1Retention: optionalText,
    d7Retention: optionalText,
    monthlyRevenue: optionalText,
    cpiCacTested: optionalText,
    targetCountries: optionalText,
    testFlightLink: optionalUrl("TestFlight or APK"),
    helpNeeded: z.array(z.string()).optional(),
    revenueShareOpen: z.enum(["yes", "no"], {
      message: "Let us know if you are open to revenue share",
    }),
  })
  .superRefine((data, ctx) => {
    const hasLink =
      data.website.length > 0 ||
      data.appStoreUrl.length > 0 ||
      data.playStoreUrl.length > 0 ||
      (data.testFlightLink?.length ?? 0) > 0;
    if (!hasLink) {
      ctx.addIssue({
        code: "custom",
        message: "Add at least one link: website, App Store, Google Play, or TestFlight/APK",
        path: ["website"],
      });
    }
  });

export type PublishFormData = z.infer<typeof publishFormSchema>;

export const contactFormSchema = z.object({
  topic: z.enum(contactTopicValues, { message: "Select what you are contacting us about" }),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type FormFieldErrors = Record<string, string[] | undefined> & {
  form?: string[];
};

export type PublishFormActionResult =
  | { ok: true }
  | { ok: false; error: FormFieldErrors; values: PublishFormValues; attemptId: string };

export type ContactFormActionResult =
  | { ok: true }
  | {
      ok: false;
      error: FormFieldErrors;
      values: { topic: string; name: string; email: string; message: string };
    };

export type FormActionResult = PublishFormActionResult | ContactFormActionResult;

export const publishStages = [
  { value: "idea", label: "Idea / concept" },
  { value: "prototype", label: "Prototype" },
  { value: "beta", label: "Beta / test build" },
  { value: "soft-launch", label: "Soft launch" },
  { value: "live", label: "Live in stores" },
] as const;
