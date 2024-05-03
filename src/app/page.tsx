import Form from "./ui/form/form";
import Description from "./ui/description/description";
import Header from "./ui/header/header";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* ヘッダー部 */}
      <Header />

      {/* コンテンツ部 */}
      <div className="">
        {/* フォーム */}
        <Form />
        {/* 説明 */}
        <Description />
      </div>
    </main>
  );
}
