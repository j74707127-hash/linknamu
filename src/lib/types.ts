export type User = {
  id: string;
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type Link = {
  id: string;
  userId: string;
  title: string;
  url: string;
  order: number;
  /** true면 카드를 눈에 띄게 강조해서 보여 준다 */
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
};
