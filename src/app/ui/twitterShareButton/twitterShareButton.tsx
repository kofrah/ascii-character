"use client";

import { Metadata } from "next";

export default function TwitterShareButton(metadata: Metadata) {
  const shareUrl = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("あなたの共有テキスト");

  const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`;

  console.log(metadata);

  // 共有ボタン押下
  const handleShare = async () => {
    try {
      console.log("Share");
      window.open(twitterUrl, "_blank");
    } catch (err) {
      console.log("Share Failed");
    }
  };

  return (
    <>
      <div className="block">
        <div className="flex justify-center">
          <button
            onClick={handleShare}
            className="py-2.5 px-5 w-32 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            このサイトを共有する
          </button>
        </div>
      </div>
    </>
  );
}
