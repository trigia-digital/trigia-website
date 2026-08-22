import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const filePath = path.join(process.cwd(), "content", "mockups", "harubookcafe.html");
  const html = fs.readFileSync(filePath, "utf8");
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
