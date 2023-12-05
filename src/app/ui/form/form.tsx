"use client";

import { data } from "@/app/lib/data";
import styles from "@/app/ui/home.module.css";
import { ChangeEvent, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  form: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // 変換結果のState
  const [result, setResult] = useState("");

  // バリデーション関数
  const validateInput = (value: string) => {
    // ひらがな、カタカナ、アルファベット、特定の記号のみを許可する正規表現
    const regex = /^[ぁ-んァ-ンA-Za-z！!？?ー\-♡]+$/;
    return (
      regex.test(value) ||
      "ひらがな、カタカナ、アルファベット、特定の記号以外が含まれています。"
    );
  };

  // ランダム生成のチェックボックスのState
  const [useRandom, setUseRandom] = useState(false);
  // 変換オプション(ひらがな)を使用するかのState
  const [useHiragana, setUseHiragana] = useState(false);
  // 変換オプション(カタカナ)を使用するかのState
  const [useKatakana, setUseKatakana] = useState(false);
  // 変換オプション(アルファベット)を使用するかのState
  const [useAlphabet, setUseAlphabet] = useState(false);
  // 変換オプション(記号)を使用するかのState
  const [useMark, setUseMark] = useState(false);

  const formBRef = useRef();

  // ひらがなをカタカナにする関数
  const toKatakana = (hiragana: string): string => {
    return hiragana.replace(/[\u3041-\u3096]/g, function (match) {
      var char = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(char);
    });
  };

  // アルファベットを大文字にする関数
  const toUpperCase = (str: string): string => {
    return str.toUpperCase();
  };

  // アスキーアートに変換
  const toAsciiArt = (string: string): string => {
    // lib 配列内の対応する文字を検索
    const art: string = data.reduce((acc, item) => {
      const foundLetter = item.letters.find((letter) => letter.text === string);
      return foundLetter ? foundLetter.art : acc;
    }, "Not Found");

    return art;
  };

  // 渡された文字をアスキーアートに変換
  const transformString = (letter: string): string => {
    let transformedString = "";

    if (/^[ぁ-ん]+$/.test(letter)) {
      // ひらがなをカタカナにする関数
      transformedString = toKatakana(letter);
    } else if (/^[a-z]+$/.test(letter)) {
      // アルファベットを大文字に変換
      transformedString = toUpperCase(letter);
    } else {
      // そのまま表示
      transformedString = letter;
    }

    return transformedString;
  };

  // 生成ボタン押下
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs): void => {
    // アスキーアート変換前の文字列
    const stringArr: string[] = data.form
      .split("")
      .map((letter) => transformString(letter));
    console.log(stringArr);

    // アスキーアート変換後の文字列
    const asciiArtArr: string[] = stringArr.map((string) => toAsciiArt(string));
    console.log(asciiArtArr);

    // Twitterの仕様上、一行目にドットがないとスペースが省略されてしまう
    asciiArtArr.unshift(".\r");

    // 文字コードをAAに変換
    const asciiArt: string = asciiArtArr.join("");

    setResult(asciiArt);
  };

  // ランダム作成チェックボックス押下
  const handleUseRandom = (e: ChangeEvent<HTMLInputElement>): void => {
    // オプションチェックボックスの活性制御
    setUseRandom(e.target.checked);

    if (e.target.checked) {
      // 各オプションをチェックする
      setUseHiragana(e.target.checked);
      setUseKatakana(e.target.checked);
      setUseAlphabet(e.target.checked);
      setUseMark(e.target.checked);
    }
  };

  // コピーボタン押下
  const handleCopy = async () => {
    try {
      // 結果をクリップボードに保存
      await navigator.clipboard.writeText(result);
      // 結果を全範囲選択
      //   formBRef.current.select();
      console.log("Copy Succeed");
    } catch (err) {
      console.log("Copy Failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 入力エリア */}
        <input
          {...register("form", {
            required: "入力してください！",
            // maxLength: {
            //   value: 4,
            //   message: "4文字以内でお願いします（；；）",
            // },
            validate: validateInput,
          })}
        />
        {errors.form && <span>{errors.form.message}</span>}

        {/* オプションエリア */}
        <div>{/* ラジオボタン(縦書き、横書き) */}</div>
        <div>
          {/* チェックボックス・「ランダム作成する」 */}
          <label>
            <input type="checkbox" onChange={(e) => handleUseRandom(e)} />
            ランダム生成
          </label>
          {/* チェックボックス・ひらがな */}
          {/* <label>
            <input
              type="checkbox"
              name="demoCheckbox"
              checked={useHiragana}
              onChange={(e) => setUseHiragana(e.target.checked)}
              disabled={true}
            />
            ひらがな（未対応）
          </label> */}
          {/* チェックボックス・カタカナ */}
          <label>
            <input
              type="checkbox"
              name="demoCheckbox"
              checked={useKatakana}
              onChange={(e) => setUseKatakana(e.target.checked)}
              disabled={!useRandom}
            />
            カタカナ
          </label>
          {/* チェックボックス・アルファベット */}
          <label>
            <input
              type="checkbox"
              name="demoCheckbox"
              checked={useAlphabet}
              onChange={(e) => setUseAlphabet(e.target.checked)}
              disabled={!useRandom}
            />
            アルファベット
          </label>
          {/* チェックボックス・記号 */}
          <label>
            <input
              type="checkbox"
              name="demoCheckbox"
              checked={useMark}
              onChange={(e) => setUseMark(e.target.checked)}
              disabled={!useRandom}
            />
            記号
          </label>
        </div>

        {/* 生成 */}
        <div>
          <input
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="submit"
            value="生成"
            // disabled={true}
          />
          <input
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="submit"
            value="デコる"
            // disabled={true}
          />
        </div>
      </form>

      {/* 結果 */}
      <div>
        <textarea
          className={styles.result}
          cols={58}
          rows={15}
          name=""
          id=""
          placeholder="結果"
          //   ref={formBRef}
          value={result}
          onChange={(e) => setResult(e.target.value)}
        ></textarea>
      </div>
      {/* 結果をコピー */}
      <div className="">
        <button
          onClick={handleCopy}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          コピー
        </button>
        <button
          onClick={handleCopy}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          ツイート
        </button>
      </div>
    </>
  );
}
