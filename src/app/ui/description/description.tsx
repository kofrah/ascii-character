import Exclamation from "../exclamation/exclamation";

export default function Description() {
  return (
    <>
      <div className="flex justify-center">
        <Exclamation />
        <div className="mt-3">
          <ul className="list-disc pl-5">
            <li>入力した文字をデカくして返すサイトです。</li>
            <li>Xの仕様に対応するため、1行目にドットを置いています。</li>
            <li>ひらがなはカタカナになります。</li>
            <li>英字は大文字になります。</li>
            {/* <li>連絡先はこちら</li> */}
          </ul>
        </div>
        <Exclamation />
      </div>
    </>
  );
}
