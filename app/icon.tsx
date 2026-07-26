import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/* Generated rather than shipped as a binary, so it stays in sync with the accent
   colour and there is no asset to forget to update. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b0d",
          color: "#7d9dff",
          fontSize: 42,
          fontWeight: 700,
          letterSpacing: "-0.06em",
        }}
      >
        P
      </div>
    ),
    size,
  );
}
