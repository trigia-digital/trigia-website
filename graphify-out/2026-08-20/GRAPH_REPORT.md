# Graph Report - trigia-nextjs  (2026-08-20)

## Corpus Check
- 79 files · ~95,594 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 413 nodes · 556 edges · 36 communities (29 shown, 7 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9b9291df`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [locale]/page.tsx
- app/not-found.tsx
- devDependencies
- services/[slug]/page.tsx
- dependencies
- compilerOptions
- Hero.tsx
- What You Must Do When Invoked
- articles/[slug]/page.tsx
- main
- capture-work-screenshots.mjs
- next.config.js
- tailwind.config.ts
- graphify reference: extra exports and benchmark
- en/berapa-biaya-bikin-website-profesional-indonesia.mdx
- en/website-vs-landing-page-vs-linktree.mdx
- id/berapa-biaya-bikin-website-profesional-indonesia.mdx
- id/website-vs-landing-page-vs-linktree.mdx
- TRIGIA Website — Next.js
- graphify reference: query, path, explain
- en/chatbot-whatsapp-hemat-waktu-kerja-manual.mdx
- id/chatbot-whatsapp-hemat-waktu-kerja-manual.mdx
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md
- rate-card/page.tsx
- opengraph-image.tsx
- DeferredEffects.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `buildWhatsAppHref()` - 13 edges
3. `routing` - 12 edges
4. `What You Must Do When Invoked` - 12 edges
5. `revealVariants` - 11 edges
6. `revealViewport` - 11 edges
7. `/graphify` - 10 edges
8. `Header()` - 9 edges
9. `SpotlightCard()` - 9 edges
10. `urlFor()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllArticles()`  [EXTRACTED]
  app/[locale]/articles/[slug]/page.tsx → lib/articles.ts
- `generateMetadata()` --calls--> `getArticleBySlug()`  [EXTRACTED]
  app/[locale]/articles/[slug]/page.tsx → lib/articles.ts
- `ArticleDetailPage()` --calls--> `urlFor()`  [EXTRACTED]
  app/[locale]/articles/[slug]/page.tsx → lib/site.ts
- `generateMetadata()` --calls--> `urlFor()`  [EXTRACTED]
  app/[locale]/layout.tsx → lib/site.ts
- `NotFound()` --calls--> `buildWhatsAppHref()`  [EXTRACTED]
  app/[locale]/not-found.tsx → lib/whatsapp.ts

## Import Cycles
- None detected.

## Communities (36 total, 7 thin omitted)

### Community 0 - "[locale]/page.tsx"
Cohesion: 0.08
Nodes (25): About, FAQ, Belief(), FaqItem, FinalCTA(), SITEMAP_LINKS, GrowthCurve(), PATHS (+17 more)

### Community 2 - "devDependencies"
Cohesion: 0.06
Nodes (33): autoprefixer, @next/bundle-analyzer, browserslist, devDependencies, autoprefixer, @next/bundle-analyzer, playwright, postcss (+25 more)

### Community 3 - "services/[slug]/page.tsx"
Cohesion: 0.09
Nodes (17): generateMetadata(), inter, organizationSchema, spaceGrotesk, PageParams, ServiceDetailItem, ServiceDetailPage(), ServiceListItem (+9 more)

### Community 4 - "dependencies"
Cohesion: 0.10
Nodes (21): framer-motion, gray-matter, lenis, next-intl, next-mdx-remote, dependencies, framer-motion, gray-matter (+13 more)

### Community 5 - "compilerOptions"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 6 - "Hero.tsx"
Cohesion: 0.11
Nodes (11): bezierPoint(), FlowCanvas(), draw(), Hero(), CUM_LENGTH, HeroSweep(), render(), pointAtT() (+3 more)

### Community 7 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 8 - "articles/[slug]/page.tsx"
Cohesion: 0.13
Nodes (19): ArticlesPage(), formatDate(), ArticleDetailPage(), formatDate(), generateMetadata(), generateStaticParams(), mdxComponents, PageParams (+11 more)

### Community 9 - "main"
Cohesion: 0.25
Nodes (3): IMG_PATH, main(), ORANGE

### Community 10 - "capture-work-screenshots.mjs"
Cohesion: 0.40
Nodes (3): __dirname, outDir, targets

### Community 11 - "next.config.js"
Cohesion: 0.40
Nodes (4): createNextIntlPlugin, nextConfig, withBundleAnalyzer, withNextIntl

### Community 16 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 17 - "en/berapa-biaya-bikin-website-profesional-indonesia.mdx"
Cohesion: 0.29
Nodes (6): A Sensible Starting Point, How to Evaluate Any Website Offer, Whoever the Vendor, The Two Camps in Indonesia's Website Market, Where the Sensible Middle Ground Actually Is, Why Cheap Isn't Always Actually Cheaper, Why Website Prices Can Differ by Up to 100x

### Community 18 - "en/website-vs-landing-page-vs-linktree.mdx"
Cohesion: 0.29
Nodes (6): Landing Page: One Page, One Goal, Linktree: A Bunch of Doors, Not a House, Quick Comparison Table, So, Where Should You Start?, The Question People Ask First, Even Though It's Not the One That Matters, Website: Your Business's Permanent Home

### Community 19 - "id/berapa-biaya-bikin-website-profesional-indonesia.mdx"
Cohesion: 0.29
Nodes (6): Cara Menilai Penawaran Website, Apapun Vendornya, Di Mana Posisi yang Masuk Akal di Antara Dua Kubu Itu, Dua Kubu di Pasar Jasa Website Indonesia, Kenapa Harga Murah Belum Tentu Hemat, Kenapa Harga Website Bisa Beda Sampai 100x Lipat, Titik Mulai yang Masuk Akal

### Community 20 - "id/website-vs-landing-page-vs-linktree.mdx"
Cohesion: 0.29
Nodes (6): Jadi, Mulai dari Mana?, Landing Page: Satu Halaman, Satu Tujuan, Linktree: Kumpulan Pintu, Bukan Rumah, Pertanyaan yang Sering Muncul Duluan, Padahal Bukan yang Paling Penting, Tabel Perbandingan Cepat, Website: Rumah Permanen Bisnis Kamu

### Community 21 - "TRIGIA Website — Next.js"
Cohesion: 0.29
Nodes (6): Build production (opsional, untuk cek sebelum deploy), Catatan penting, Deploy, Menjalankan di lokal, Struktur folder, TRIGIA Website — Next.js

### Community 22 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 23 - "en/chatbot-whatsapp-hemat-waktu-kerja-manual.mdx"
Cohesion: 0.33
Nodes (5): A Realistic Starting Point, A Simple Example Calculation, The Work That Feels "Light" But Quietly Eats Your Time, What Can Actually Be Automated (and What Can't), What the Process Looks Like With TRIGIA

### Community 24 - "id/chatbot-whatsapp-hemat-waktu-kerja-manual.mdx"
Cohesion: 0.33
Nodes (5): Apa yang Sebenarnya Bisa Diotomasi (dan Apa yang Tidak), Bagaimana Prosesnya Kalau Lewat TRIGIA, Contoh Perhitungan Sederhana, Kerjaan yang Terasa "Nggak Berat" Tapi Diam-Diam Menyita Waktu, Titik Awal yang Realistis

### Community 25 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 26 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 27 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 34 - "rate-card/page.tsx"
Cohesion: 0.08
Nodes (16): NotFound(), PrototypeItem, RateCardBundle, RateCardCategory, RateCardLineItem, RateCardPage(), Footer(), Header() (+8 more)

### Community 35 - "opengraph-image.tsx"
Cohesion: 0.33
Nodes (4): alt, contentType, runtime, size

### Community 36 - "DeferredEffects.tsx"
Cohesion: 0.13
Nodes (8): CustomCursor(), CustomCursor, DeferredEffects(), SmoothScroll, Spotlight, SmoothScroll(), Window, Spotlight()

## Knowledge Gaps
- **187 isolated node(s):** `mdxComponents`, `PageParams`, `organizationSchema`, `spaceGrotesk`, `inter` (+182 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `routing` connect `services/[slug]/page.tsx` to `articles/[slug]/page.tsx`, `rate-card/page.tsx`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `buildWhatsAppHref()` connect `rate-card/page.tsx` to `[locale]/page.tsx`, `Hero.tsx`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `Header()` connect `rate-card/page.tsx` to `articles/[slug]/page.tsx`, `[locale]/page.tsx`, `services/[slug]/page.tsx`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `mdxComponents`, `PageParams`, `organizationSchema` to the rest of the system?**
  _187 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `[locale]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07908163265306123 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `services/[slug]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09206349206349207 - nodes in this community are weakly interconnected._