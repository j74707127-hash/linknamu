import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CopyLinkButton from "@/components/CopyLinkButton";
import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { getLinksByUserId, getUserByUsername } from "@/lib/sample-data";

export async function generateMetadata(props: PageProps<"/[username]">): Promise<Metadata> {
  const { username } = await props.params;
  const user = await getUserByUsername(username);
  if (!user) return { title: "링크나무" };

  const title = `${user.displayName} | 링크나무`;
  const description = user.bio ?? `${user.displayName}의 링크 모음`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: user.avatarUrl ? [user.avatarUrl] : undefined,
    },
  };
}

export default function ProfilePage(props: PageProps<"/[username]">) {
  return (
    <Suspense fallback={<main className="flex-1" aria-busy="true" />}>
      <Profile params={props.params} />
    </Suspense>
  );
}

async function Profile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user = await getUserByUsername(username);
  if (!user) notFound();

  const links = await getLinksByUserId(user.id);

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 py-12">
      <ProfileHeader user={user} />
      <section aria-label="링크 목록" className="mt-8">
        <LinkList links={links} />
      </section>
      <footer
        data-component="Footer"
        data-source="src/app/[username]/page.tsx"
        className="mt-10 flex flex-col items-center gap-3"
      >
        <CopyLinkButton />
        <p className="text-xs text-neutral-400">made with 링크나무</p>
      </footer>
    </main>
  );
}
