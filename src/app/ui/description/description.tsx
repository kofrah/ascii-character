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
            <li>ひらがなはカタカナに変換されます。</li>
            <li>アルファベットは大文字に変換されます。</li>
            {/* <li>連絡先はこちら</li> */}
          </ul>
        </div>
        <Exclamation />
      </div>
    </>
  );
}
