import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TRIGIA Digital";

async function loadGoogleFont(family: string, weight: number, text: string) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`
    )
  ).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (match) {
    const response = await fetch(match[1]);
    if (response.ok) return response.arrayBuffer();
  }
  throw new Error(`Failed to load font: ${family}`);
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tagline = locale === "id" ? "Mitra Pertumbuhan Digital Anda" : "Your Digital Growth Partner";

  const logoPath = path.join(process.cwd(), "public", "logo-mark-alpha.png");
  const logoBase64 = fs.readFileSync(logoPath).toString("base64");
  const logoDataUri = `data:image/png;base64,${logoBase64}`;

  const fullText = `TRIGIA ${tagline}`;
  const [spaceGroteskBold, spaceGroteskMedium] = await Promise.all([
    loadGoogleFont("Space Grotesk", 700, "TRIGIA"),
    loadGoogleFont("Space Grotesk", 500, fullText),
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
