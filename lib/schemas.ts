import { z } from "zod";

const optionalUrl = (label: string) =>
  z
    .string()
    .trim()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: `Enter a valid ${label} URL (https://...)`,
    });

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
  })
  .superRefine((data, ctx) => {
    const hasLink =
      data.website.length > 0 || data.appStoreUrl.length > 0 || data.playStoreUrl.length > 0;
    if (!hasLink) {
      ctx.addIssue({
        code: "custom",
        message: "Provide at least one link: website, App Store, or Google Play",
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
