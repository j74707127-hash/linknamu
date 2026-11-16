export type LinkService =
  | "github"
  | "instagram"
  | "youtube"
  | "x"
  | "linkedin"
  | "tiktok"
  | "notion"
  | "blog"
  | "mail"
  | "default";

/** http/https만 허용하고 javascript: 같은 위험한 URL은 막는다. */
export function isSafeUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const DOMAIN_RULES: [RegExp, LinkService][] = [
  [/(^|\.)github\.com$/, "github"],
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube"],
  [/(^|\.)(x\.com|twitter\.com)$/, "x"],
  [/(^|\.)linkedin\.com$/, "linkedin"],
  [/(^|\.)tiktok\.com$/, "tiktok"],
  [/(^|\.)(notion\.so|notion\.site)$/, "notion"],
  [/(^|\.)(tistory\.com|velog\.io|medium\.com|blog\.naver\.com|brunch\.co\.kr)$/, "blog"],
];

/** URL 도메인으로 서비스 아이콘 종류를 고른다. 인식 실패 시 default. */
export function detectService(value: string): LinkService {
  try {
    const host = new URL(value).hostname.toLowerCase();
    for (const [pattern, service] of DOMAIN_RULES) {
      if (pattern.test(host)) return service;
    }
  } catch {
    // 잘못된 URL은 기본 아이콘
  }
  return "default";
}
