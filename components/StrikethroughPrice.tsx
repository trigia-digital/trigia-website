export default function StrikethroughPrice({ value }: { value: string }) {
  return <span className="block text-[11px] text-text-dim line-through mb-0.5">{value}</span>;
}
