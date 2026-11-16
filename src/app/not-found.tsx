import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-5 py-16 text-center">
      <h1 className="text-xl font-bold text-neutral-900">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-sm text-neutral-600">주소가 맞는지 다시 확인해 주세요.</p>
      <Link href="/" className="mt-6 text-sm font-semibold text-emerald-700 underline">
        홈으로
      </Link>
    </main>
  );
}
