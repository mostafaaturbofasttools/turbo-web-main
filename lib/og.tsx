import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

export function OgImage({ title, subtitle }: { title: string; subtitle?: string }) {
  const logoUrl = `${siteConfig.url}/logo-512.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 80px",
          background: "linear-gradient(135deg, #07080c 0%, #12102a 50%, #07080c 100%)",
          color: "#f4f6fb",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 32,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="" width={72} height={72} />
          <span style={{ fontSize: 22, fontWeight: 700, color: "#9aa3b5" }}>{siteConfig.name}</span>
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>{title}</div>
        {subtitle ? (
          <div style={{ marginTop: 24, fontSize: 28, color: "#9aa3b5", maxWidth: 800 }}>{subtitle}</div>
        ) : null}
      </div>
    ),
    ogSize,
  );
}
