import { isSafeUrl } from "@/lib/links";
import type { Link } from "@/lib/types";
import LinkCard from "./LinkCard";

export default function LinkList({ links }: { links: Link[] }) {
  const safeLinks = links.filter((l) => isSafeUrl(l.url));

  if (safeLinks.length === 0) {
    return <p className="py-8 text-center text-sm text-neutral-500">아직 등록된 링크가 없습니다</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {safeLinks.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} />
        </li>
      ))}
    </ul>
  );
}
