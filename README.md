# TRIGIA Website — Next.js

Breakdown dari demo HTML ke struktur Next.js (App Router) + Tailwind CSS +
Framer Motion, siap dikembangkan di VS Code.

## Menjalankan di lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Struktur folder

```
app/
  layout.tsx        — root layout, font loading, overlay global (grain/cursor/spotlight/intro)
  page.tsx           — merakit semua section jadi 1 halaman
  globals.css         — design tokens + semua styling custom (di luar utility Tailwind biasa)

components/
  Header.tsx           — navbar + menu mobile
  Intro.tsx             — intro sinematik (logo burst → terbang ke navbar → wipe reveal)
  Hero.tsx               — headline reveal + parallax + CTA
  FlowCanvas.tsx           — animasi canvas (ember + garis energi) di hero
  Marquee.tsx               — teks berjalan infinite
  GrowthCurve.tsx            — garis kurva pemisah section (draw-in via Framer Motion)
  Belief.tsx                  — pernyataan brand belief
  Showcase.tsx                  — mockup browser (pure CSS, tanpa gambar)
  Services.tsx                   — daftar 5 layanan
  Process.tsx                     — 5 langkah cara kerja
  Work.tsx                         — studi kasus dengan tilt 3D on-hover
  About.tsx                         — tentang TRIGIA + trait brand
  FinalCTA.tsx                      — CTA penutup dengan parallax background
  Footer.tsx                         — footer dengan wordmark raksasa
  MagneticButton.tsx                 — tombol pill reusable dengan efek magnetic
  Grain.tsx / Spotlight.tsx / CustomCursor.tsx — overlay global (lihat layout.tsx)

lib/
  motion.ts   — variant Framer Motion yang dipakai bareng di banyak section
```

## Catatan penting

- **Assets** (`logo-mark.png`, `logo-lockup.png`, `bg-curve-1.jpg`, `bg-curve-2.jpg`,
  `favicon.png`) sudah ada di folder `public/` — hasil export dari file asli yang
  Anda upload, sudah dikompres.
- **Section Work** masih pakai data placeholder (`Case study slot 01/02/03`).
  Ganti isi array `CASES` di `components/Work.tsx` begitu ada studi kasus asli.
- **Warna & font brand** diatur terpusat di `tailwind.config.ts` (warna) dan
  `app/layout.tsx` (font Space Grotesk + Inter via `next/font/google` — otomatis
  di-self-host oleh Next.js, jadi tidak bergantung ke CDN Google saat production).
- Semua animasi (custom cursor, magnetic button, tilt card, parallax, canvas)
  otomatis nonaktif di perangkat sentuh dan saat pengguna mengaktifkan
  `prefers-reduced-motion`.
- Section `Impact Program` sengaja tidak ada — sesuai keputusan sebelumnya itu
  konten khusus kampanye sosial media, bukan halaman utama website.

## Deploy

Project ini siap langsung di-push ke Vercel (sesuai stack yang biasa Anda pakai):

```bash
git init
git add .
git commit -m "Initial TRIGIA website"
# push ke GitHub, lalu import project di Vercel
```

## Build production (opsional, untuk cek sebelum deploy)

```bash
npm run build
npm run start
```
