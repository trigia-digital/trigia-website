import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TRIGIA Digital";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tagline = locale === "id" ? "Mitra Pertumbuhan Digital Anda" : "Your Digital Growth Partner";

  const logoBuffer = await fetch(new URL("./assets/logo-mark-alpha.png", import.meta.url)).then((r) =>
    r.arrayBuffer()
  );
  const logoDataUri = `data:image/png;base64,${Buffer.from(logoBuffer).toString("base64")}`;

  const [spaceGroteskBold, spaceGroteskMedium] = await Promise.all([
    fetch(new URL("./assets/space-grotesk-700.woff", import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL("./assets/space-grotesk-500.woff", import.meta.url)).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0B0D",
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,90,31,0.22), transparent 55%), radial-gradient(circle at 80% 85%, rgba(255,90,31,0.15), transparent 50%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri} width={120} height={120} style={{ marginBottom: 36 }} />
        <div
          style={{
            fontFamily: "Space Grotesk",
            fontWeight: 700,
            fontSize: 84,
            color: "#FFFFFF",
            letterSpacing: "0.01em",
          }}
        >
          TRIGIA
        </div>
        <div
          style={{
            fontFamily: "Space Grotesk",
            fontWeight: 500,
            fontSize: 34,
            color: "#FF5A1F",
            marginTop: 20,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: spaceGroteskBold, weight: 700, style: "normal" },
        { name: "Space Grotesk", data: spaceGroteskMedium, weight: 500, style: "normal" },
      ],
    }
  );
}
