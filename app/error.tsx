"use client";
import { useEffect } from "react";
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-red-500">500</p>
      <h1 className="mt-4 text-xl font-semibold text-stone-900 dark:text-stone-100">出了点小问题</h1>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">服务器开小差了，点下面按钮重试一下。</p>
      <button onClick={reset} className="mt-6 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-700 dark:bg-white dark:text-stone-900">重新加载</button>
    </div>
  );
}
