import { detectService } from "@/lib/links";
import type { Link } from "@/lib/types";
import ServiceIcon from "./ServiceIcon";

const BASE =
  "flex items-center gap-3 rounded-2xl px-4 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 active:scale-[0.99]";

const NORMAL = "border border-neutral-200 bg-white py-3 shadow-sm hover:border-emerald-500";

// 눈에 띄게 강조하는 카드: 진한 배경, 굵은 글씨, 더 큰 높이와 그림자
const FEATURED =
  "border-2 border-red-600 bg-red-600 py-4 shadow-lg shadow-red-600/30 hover:bg-red-700 hover:border-red-700";

export default function LinkCard({ link }: { link: Link }) {
  const featured = link.featured === true;
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      data-component="LinkCard"
      data-source="src/components/LinkCard.tsx"
      className={`${BASE} ${featured ? FEATURED : NORMAL}`}
    >
      <span className={featured ? "rounded-full ring-2 ring-white" : undefined}>
        <ServiceIcon service={detectService(link.url)} />
      </span>
      <span
        className={`flex-1 truncate text-center ${
          featured ? "text-lg font-bold text-white" : "font-medium text-neutral-900"
        }`}
      >
        {link.title}
      </span>
      {featured ? (
        <span
          className="w-9 shrink-0 text-center text-lg font-bold text-white"
          aria-hidden="true"
        >
          ▶
        </span>
      ) : (
        // 아이콘 폭만큼 오른쪽 여백을 맞춰 제목을 가운데로
        <span className="w-9 shrink-0" aria-hidden="true" />
      )}
    </a>
  );
}
