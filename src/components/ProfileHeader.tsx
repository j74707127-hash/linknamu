import type { User } from "@/lib/types";

export default function ProfileHeader({ user }: { user: User }) {
  return (
    <header className="flex flex-col items-center text-center">
      {user.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.avatarUrl}
          alt={`${user.displayName} 프로필 사진`}
          className="h-32 w-32 rounded-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label="기본 프로필 이미지"
          className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-100 text-6xl"
        >
          🌳
        </div>
      )}
      <h1 className="mt-4 text-xl font-bold text-neutral-900">{user.displayName}</h1>
      {user.bio && <p className="mt-1 text-sm text-neutral-600">{user.bio}</p>}
    </header>
  );
}
