import { z } from "zod";

const optionalUrl = (label: string) =>
  z
    .string()
    .trim()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: `Enter a valid ${label} URL (https://...)`,
    });

const optionalText = z.string().trim();

export const publishHelpOptions = [
  { value: "publishing", label: "Publishing & distribution" },
  { value: "ua", label: "User acquisition / UA" },
  { value: "creatives", label: "Ad creatives & ASO" },
  { value: "product", label: "Product & retention" },
  { value: "co-dev", label: "Co-development" },
  { value: "other", label: "Other" },
] as const;

export const publishFormSchema = z
  .object({
    appName: z.string().min(2, "App name is required"),
    appDescription: z.string().min(20, "Please describe your app"),
    category: z.string().min(2, "Category is required"),
    teamSize: z.string().min(1, "Team size is required"),
    stage: z.enum(["idea", "prototype", "beta", "soft-launch", "live"], {
      message: "Select your app stage",
    }),
    traction: z
      .string()
      .min(10, "Tell us where the app is today (e.g. pre-launch, beta testers, or live traction)"),
    website: optionalUrl("website"),
    appStoreUrl: optionalUrl("App Store"),
    playStoreUrl: optionalUrl("Google Play"),
    contactEmail: z.string().email("Valid email required"),
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
        message: "Provide at least one link: website, App Store, Google Play, or TestFlight/APK",
        path: ["website"],
      });
    }
  });

export type PublishFormData = z.infer<typeof publishFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type FormFieldErrors = Record<string, string[] | undefined> & {
  form?: string[];
};

export type FormActionResult =
  | { ok: true }
  | { ok: false; error: FormFieldErrors };

export const publishStages = [
  { value: "idea", label: "Idea / concept" },
  { value: "prototype", label: "Prototype" },
  { value: "beta", label: "Beta / test build" },
  { value: "soft-launch", label: "Soft launch" },
  { value: "live", label: "Live in stores" },
] as const;
