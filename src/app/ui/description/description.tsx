import Exclamation from "../exclamation/exclamation";

export default function Description() {
  return (
    <>
      <div className="flex justify-center">
        <div className="mt-3">
          <ul className="list-disc pl-5">
            <li>入力した文字をデカくします。</li>
            <li>ひらがなはカタカナになります。</li>
            <li>英字は大文字になります。</li>
            <li>デカ文字は1つあたり約42文字分あります。</li>
            <li>ハッシュタグは削除しても大丈夫です。</li>
            <li>
              Xにポストする場合、1行目を全て削除すると崩れるため注意してください。
            </li>
            {/* <li>連絡先はこちら</li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
