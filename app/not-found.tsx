// Root-level fallback for routes that don't even match a locale segment.
// No next-intl context is available here, so this stays static and
// locale-neutral — app/[locale]/not-found.tsx handles the normal case.
//
// Forced dynamic: some requests reach this route through paths the
// next-intl middleware matcher excludes (e.g. a fake file extension).
// Letting Next.js statically prerender it clashes with next-intl's
// internal per-request locale detection on those requests.
export const dynamic = "force-dynamic";

export default function RootNotFound() {
  return (
    <html>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          background: "#0B0B0D",
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ fontSize: "72px", fontWeight: 700, color: "#FF5A1F" }}>404</div>
        <p style={{ color: "#9A9A9F", maxWidth: "360px" }}>
          Page not found / Halaman tidak ditemukan.
        </p>
        <a
          href="/"
          style={{
            color: "#FF5A1F",
            textDecoration: "underline",
            fontSize: "14px",
          }}
        >
          ← Back to homepage
        </a>
      </body>
    </html>
  );
}
