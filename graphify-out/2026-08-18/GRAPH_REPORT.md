# Graph Report - trigia-nextjs  (2026-08-18)

## Corpus Check
- 71 files · ~93,157 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 372 nodes · 486 edges · 32 communities (26 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `74ca9d0d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [locale]/page.tsx
- articles/[slug]/page.tsx
- devDependencies
- layout.tsx
- dependencies
- compilerOptions
- Hero.tsx
- What You Must Do When Invoked
- services/[slug]/page.tsx
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

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `What You Must Do When Invoked` - 12 edges
3. `revealVariants` - 11 edges
4. `revealViewport` - 11 edges
5. `buildWhatsAppHref()` - 11 edges
6. `routing` - 10 edges
7. `/graphify` - 10 edges
8. `SpotlightCard()` - 9 edges
9. `Header()` - 8 edges
10. `graphify reference: extra exports and benchmark` - 8 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllArticles()`  [EXTRACTED]
  app/[locale]/articles/[slug]/page.tsx → lib/articles.ts
- `generateMetadata()` --calls--> `getArticleBySlug()`  [EXTRACTED]
  app/[locale]/articles/[slug]/page.tsx → lib/articles.ts
- `RateCardPage()` --calls--> `buildWhatsAppHref()`  [EXTRACTED]
  app/[locale]/rate-card/page.tsx → lib/whatsapp.ts
- `Hero()` --calls--> `buildWhatsAppHref()`  [EXTRACTED]
  components/Hero.tsx → lib/whatsapp.ts
- `ArticleDetailPage()` --calls--> `coverImageExists()`  [EXTRACTED]
  app/[locale]/articles/[slug]/page.tsx → lib/articles.ts

## Import Cycles
- None detected.

## Communities (32 total, 6 thin omitted)

### Community 0 - "[locale]/page.tsx"
Cohesion: 0.07
Nodes (32): RateCardBundle, RateCardCategory, RateCardLineItem, RateCardPage(), About(), Belief(), FAQ(), FaqItem (+24 more)

### Community 1 - "articles/[slug]/page.tsx"
Cohesion: 0.07
Nodes (28): ArticlesPage(), formatDate(), ArticleDetailPage(), formatDate(), generateMetadata(), generateStaticParams(), mdxComponents, PageParams (+20 more)

### Community 2 - "devDependencies"
Cohesion: 0.08
Nodes (25): autoprefixer, devDependencies, autoprefixer, playwright, postcss, tailwindcss, @types/node, @types/react (+17 more)

### Community 3 - "layout.tsx"
Cohesion: 0.10
Nodes (8): inter, spaceGrotesk, CustomCursor(), Grain(), Intro(), SmoothScroll(), Window, Spotlight()

### Community 4 - "dependencies"
Cohesion: 0.11
Nodes (19): framer-motion, gray-matter, lenis, next-intl, next-mdx-remote, dependencies, framer-motion, gray-matter (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 6 - "Hero.tsx"
Cohesion: 0.11
Nodes (11): bezierPoint(), FlowCanvas(), draw(), Hero(), CUM_LENGTH, HeroSweep(), render(), pointAtT() (+3 more)

### Community 7 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 8 - "services/[slug]/page.tsx"
Cohesion: 0.20
Nodes (5): PageParams, ServiceDetailItem, ServiceListItem, SERVICE_SLUGS, ServiceSlug

### Community 9 - "main"
Cohesion: 0.25
Nodes (3): IMG_PATH, main(), ORANGE

### Community 10 - "capture-work-screenshots.mjs"
Cohesion: 0.40
Nodes (3): __dirname, outDir, targets

### Community 11 - "next.config.js"
Cohesion: 0.50
Nodes (3): createNextIntlPlugin, nextConfig, withNextIntl

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

## Knowledge Gaps
- **173 isolated node(s):** `mdxComponents`, `PageParams`, `spaceGrotesk`, `inter`, `PrototypeItem` (+168 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `routing` connect `articles/[slug]/page.tsx` to `[locale]/page.tsx`, `services/[slug]/page.tsx`, `layout.tsx`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `buildWhatsAppHref()` connect `[locale]/page.tsx` to `Hero.tsx`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `Header()` connect `articles/[slug]/page.tsx` to `[locale]/page.tsx`, `services/[slug]/page.tsx`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `mdxComponents`, `PageParams`, `spaceGrotesk` to the rest of the system?**
  _173 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `[locale]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0655367231638418 - nodes in this community are weakly interconnected._
- **Should `articles/[slug]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07312925170068027 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._