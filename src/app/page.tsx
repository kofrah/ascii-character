import Image from "next/image";
import Form from "./ui/form/form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* ヘッダー部 */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>

      {/* コンテンツ部 */}
      <div className="">
        <p>
          入力した文字をX（旧Twitter）用のアスキーアートにして返すサイトです。{" "}
          <br />
          ・漢字、ひらがなはカタカナに変換されます。
          <br />
          ・ひらがなは対応予定です。（のちのち...）
          <br />
          ・漢字は対応予定ないです。（無理なので...）
          <br />
          ・文字コードはUnicodeです。
        </p>
        {/* 入力 */}
        <Form />
      </div>

      {/* フッター部 */}
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
