import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "daisydaines — builder. poet. future dunker.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "oklch(0.09 0 0)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "18px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          daisydaines.com
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "96px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: "32px",
          }}
        >
          daisydaines
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "28px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "-0.01em",
          }}
        >
          builder. poet. future dunker.
        </div>
      </div>
    ),
    { ...size }
  );
}
