import type { Link, User } from "./types";

// DB(MongoDB Atlas) 연결 전까지 쓰는 샘플 데이터
const now = "2026-11-16T00:00:00.000Z";

const users: User[] = [
  {
    id: "u1",
    username: "demo",
    displayName: "장서윤",
    bio: "프론트엔드 개발자 & 블로거",
    avatarUrl: "/tj.jpg",
    createdAt: now,
    updatedAt: now,
  },
];

const links: Link[] = [
  { id: "l1", userId: "u1", title: "GitHub", url: "https://github.com", order: 1, createdAt: now, updatedAt: now },
  { id: "l2", userId: "u1", title: "기술 블로그", url: "https://velog.io", order: 2, createdAt: now, updatedAt: now },
  { id: "l3", userId: "u1", title: "Instagram", url: "https://www.instagram.com", order: 3, createdAt: now, updatedAt: now },
  { id: "l4", userId: "u1", title: "YouTube", url: "https://www.youtube.com", order: 4, featured: true, createdAt: now, updatedAt: now },
];

export async function getUserByUsername(username: string): Promise<User | null> {
  return users.find((u) => u.username === username) ?? null;
}

export async function getLinksByUserId(userId: string): Promise<Link[]> {
  return links.filter((l) => l.userId === userId).sort((a, b) => a.order - b.order);
}
