import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function OgImage({ title, subtitle }: { title: string; subtitle?: string }) {
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
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #4f7bff, #a259ff)",
            }}
          />
          <span style={{ fontSize: 22, fontWeight: 700, color: "#9aa3b5" }}>TRBO FAST TOOLS INC</span>
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
