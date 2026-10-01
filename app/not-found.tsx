import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-emerald-600">404</p>
      <h1 className="mt-4 text-xl font-semibold text-stone-900">页面没找到</h1>
      <p className="mt-2 text-sm text-stone-600">你访问的页面不存在，可能链接已失效。回到首页继续浏览健康内容吧。</p>
      <Link href="/" className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700">返回首页</Link>
    </div>
  );
}
