import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — full-stack developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Mirrors the hero: outline name over solid name, one line of positioning, and a
   metadata footer. Shared links then look like the site rather than like a
   default card. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0b0d",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#656c7d",
            fontSize: 22,
            letterSpacing: "0.14em",
          }}
        >
          <span>12.9716° N — 77.5946° E</span>
          <span>PORTFOLIO — 2K26</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Satori does not implement -webkit-text-stroke, so the hero's hollow
              layer becomes a tonal contrast here instead of an outline. */}
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 500,
              letterSpacing: "-0.05em",
              color: "#4b5261",
              lineHeight: 1,
            }}
          >
            {site.firstName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              color: "#eceef2",
              lineHeight: 1,
            }}
          >
            {site.lastName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 30, color: "#969db0" }}>
            Full-stack developer — Python/FastAPI and Next.js/TypeScript
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "center",
              fontSize: 22,
              letterSpacing: "0.14em",
              color: "#3ddc84",
            }}
          >
            <span>BENGALURU</span>
            <span style={{ color: "#656c7d" }}>/</span>
            <span>OPEN TO WORK</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
