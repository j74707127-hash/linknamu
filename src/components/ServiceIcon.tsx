import type { LinkService } from "@/lib/links";

const LABELS: Record<LinkService, { text: string; className: string }> = {
  github: { text: "GH", className: "bg-neutral-900 text-white" },
  instagram: { text: "IG", className: "bg-pink-600 text-white" },
  youtube: { text: "YT", className: "bg-red-600 text-white" },
  x: { text: "X", className: "bg-black text-white" },
  linkedin: { text: "in", className: "bg-sky-700 text-white" },
  tiktok: { text: "TT", className: "bg-neutral-800 text-white" },
  notion: { text: "N", className: "bg-white text-neutral-900 ring-1 ring-neutral-300" },
  blog: { text: "B", className: "bg-emerald-600 text-white" },
  mail: { text: "@", className: "bg-amber-600 text-white" },
  default: { text: "🔗", className: "bg-neutral-200 text-neutral-700" },
};

export default function ServiceIcon({ service }: { service: LinkService }) {
  const { text, className } = LABELS[service];
  return (
    <span
      aria-hidden="true"
      data-component="ServiceIcon"
      data-source="src/components/ServiceIcon.tsx"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${className}`}
    >
      {text}
    </span>
  );
}
