import { detectService } from "@/lib/links";
import type { Link } from "@/lib/types";
import ServiceIcon from "./ServiceIcon";

export default function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 active:scale-[0.99]"
    >
      <ServiceIcon service={detectService(link.url)} />
      <span className="flex-1 truncate text-center font-medium text-neutral-900">{link.title}</span>
      {/* 아이콘 폭만큼 오른쪽 여백을 맞춰 제목을 가운데로 */}
      <span className="w-9 shrink-0" aria-hidden="true" />
    </a>
  );
}
