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
  createdAt: string;
  updatedAt: string;
};
