import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ArticleMeta = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string; // ISO date
  readingTime: string;
};

export type Article = ArticleMeta & {
  content: string;
};

const ARTICLES_ROOT = path.join(process.cwd(), "content", "articles");
const PUBLIC_ROOT = path.join(process.cwd(), "public");

function readArticleFile(locale: string, filename: string): Article {
  const filePath = path.join(ARTICLES_ROOT, locale, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = typeof data.slug === "string" ? data.slug : filename.replace(/\.mdx$/, "");

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    metaTitle: typeof data.metaTitle === "string" ? data.metaTitle : (typeof data.title === "string" ? data.title : slug),
    metaDescription: typeof data.metaDescription === "string" ? data.metaDescription : "",
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    coverImage: typeof data.coverImage === "string" ? data.coverImage : "",
    category: typeof data.category === "string" ? data.category : "",
    tags: Array.isArray(data.tags) ? data.tags.filter((t): t is string => typeof t === "string") : [],
    author: typeof data.author === "string" ? data.author : "",
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : "",
    readingTime: typeof data.readingTime === "string" ? data.readingTime : "",
    content,
  };
}

// Scans content/articles/[locale]/*.mdx and returns metadata sorted newest
// first (by publishedAt). Returns an empty array if the folder is missing
// or has no .mdx files yet — never throws, so pages/builds stay safe with
// zero articles.
export function getAllArticles(locale: string): ArticleMeta[] {
  const dir = path.join(ARTICLES_ROOT, locale);
  if (!fs.existsSync(dir)) return [];

  const filenames = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const articles = filenames.map((filename) => {
    const { content: _content, ...meta } = readArticleFile(locale, filename);
    return meta;
  });

  return articles.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0));
}

export function getArticleBySlug(locale: string, slug: string): Article | null {
  const dir = path.join(ARTICLES_ROOT, locale);
  if (!fs.existsSync(dir)) return null;

  const filenames = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const match = filenames.find((filename) => {
    const candidateSlug = filename.replace(/\.mdx$/, "");
    if (candidateSlug === slug) return true;
    // Also match on an explicit frontmatter `slug` field, in case it
    // differs from the filename.
    const raw = fs.readFileSync(path.join(dir, filename), "utf8");
    const { data } = matter(raw);
    return data.slug === slug;
  });

  if (!match) return null;
  return readArticleFile(locale, match);
}

// Checks whether a coverImage path (e.g. "/images/blog/foo.svg") actually
// exists under public/. Used by listing/detail pages to fall back to a
// design-token gradient instead of a broken <img>.
export function coverImageExists(coverImage: string | undefined | null): boolean {
  if (!coverImage) return false;
  const filePath = path.join(PUBLIC_ROOT, coverImage);
  return fs.existsSync(filePath);
}
