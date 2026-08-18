import Image from "next/image";

type ArticleCoverProps = {
  src: string;
  hasImage: boolean;
  alt: string;
  className?: string;
};

// Renders the article's cover image if the file actually exists under
// public/, otherwise falls back to a brand-token gradient (same orange
// radial-glow technique used in SpotlightCard) so a missing asset never
// breaks the layout or shows a broken <img>.
export default function ArticleCover({ src, hasImage, alt, className = "" }: ArticleCoverProps) {
  return (
    <div className={`relative w-full aspect-[8/5] overflow-hidden bg-dark-gray ${className}`}>
      {hasImage ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-dark-gray to-obsidian"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 30% 25%, rgba(255,90,31,0.22), transparent 65%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
