export default function BonusPill({ label }: { label: string }) {
  return (
    <span className="text-[12px] text-orange font-semibold border border-orange/50 rounded-full px-3.5 py-1.5">
      ★ {label}
    </span>
  );
}
