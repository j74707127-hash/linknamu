import Link from "next/link";

export default function Home() {
  return (
    <main
      data-component="HomePage"
      data-source="src/app/page.tsx"
      className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-5 py-16 text-center">
      <div className="text-5xl" aria-hidden="true">
        🌳
      </div>
      <h1 className="mt-4 text-3xl font-bold text-neutral-900">링크나무</h1>
      <p className="mt-3 text-neutral-600">
        내 모든 링크를 한 페이지에 모아 두고,
        <br />
        하나의 링크로 공유하세요.
      </p>
      <Link
        href="/demo"
        className="mt-8 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
      >
        예시 페이지 보기
      </Link>
    </main>
  );
}
