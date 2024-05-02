import Form from "./ui/form/form";
import Description from "./ui/description/description";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* ヘッダー部 */}
      <div>
        <p>　┏━┏┳┓　┏┓　　　┏━━━━┓　　　┏┳┓</p>
        <p>　┗━┗┻┛┏┛┗━━┓┗━┓┏━┛┏━━┗┻┫</p>
        <p>┏━━━━┓┗┓┏━┓┃┏━┛┗━┓┣━━┫┃┃</p>
        <p>┗━┓┏━┛　┃┃　┃┃┗━┓┏━┛┗━━┛┃┃</p>
        <p>　┏┛┛　　┏┛┛┏┛┃　　┃┗━┓┏━━━┛┃</p>
        <p>　┗┛　　　┗┛　┗━┛　　┗━━┛┗━━━━┛</p>
      </div>
      <div>
        <p>　　　┏┳┓　　　　　　　┏┓　　┏┓　　　　　　　　　　┏━━━━┓</p>
        <p>┏━━┗┻┫　　　　　┏━┛┗━┓┃┃　　　　　　　　　　┃┏━━┓┃</p>
        <p>┣━━┫┃┃　┏━━┓┗━━┓┏┛┃┃　　┏┓┏━━━━┓┃┃┏━┛┃</p>
        <p>┗━━┛┃┃　┗┓┏┛　┏┛┏╋┓┃┃　┏┏┛┗━━━━┛┗┛┗━┓┃</p>
        <p>┏━━━┛┃　┏┛┗┓┏┛┫┃┗┛┃┗━┏┛　　　　　　　　　　┏┛┃</p>
        <p>┗━━━━┛　┗━━┛┗┛┗┛　　┗━━┛　　　　　　　　　　　┗━┛</p>
      </div>

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
