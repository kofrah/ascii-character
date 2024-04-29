"use client";

import { data } from "@/app/lib/data_twitter";
import {
  Inputs,
  Letter,
  SubmitButton,
  Width,
  submitButtons,
  widthOptions,
} from "@/app/lib/definition";
import styles from "@/app/ui/home.module.css";
import { ChangeEvent, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // 変換結果のState
  const [result, setResult] = useState(
    ".\n　┏━┏┳┓　┏┓　　　┏━━━━┓　　　┏┳┓　　┏┓　　\n　┗━┗┻┛┏┛┗━━┓┗━┓┏━┛┏━━┗┻┫　　┃┃　　\n┏━━━━┓┗┓┏━┓┃┏━┛┗━┓┣━━┫┃┃　　┃┃　　\n┗━┓┏━┛　┃┃　┃┃┗━┓┏━┛┗━━┛┃┃　　┗┛　　\n　┏┛┛　　┏┛┛┏┛┃　　┃┗━┓┏━━━┛┃　　┏┓　　\n　┗┛　　　┗┛　┗━┛　　┗━━┛┗━━━━┛　　┗┛　　\n"
  );

  const submitRef = useRef<HTMLInputElement>(null);

  // バリデーション関数
  const validateInput = (value: string) => {
    // ひらがな、カタカナ、アルファベット、特定の記号のみを許可する正規表現
    const regex = /^[ぁ-んァ-ンA-Za-z！!？?ー\-♡()（）]+$/;
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
  // 変換オプション(記号)を使用するかのState
  const [useHorizon, setUseHorizon] = useState(true);

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
  const toAsciiArt = (char: string, width: Width): string => {
    console.log(width);

    let filterdData;
    if (width === "half") {
      filterdData = data.filter((x) => x.width === "half");
    } else {
      filterdData = data.filter((x) => x.width === "full");
    }

    // lib 配列内の対応する文字を検索
    const art: string = filterdData.reduce((acc, item) => {
      const foundLetter: Letter | undefined = item.letters.find(
        (letter) => letter.text === char
      );

      return foundLetter ? foundLetter.art : acc;
    }, "N/A");

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
  const createArt: SubmitHandler<Inputs> = (data: Inputs): void => {
    console.log("InputsData", data);

    // アスキーアート変換前の文字列
    const stringArr: string[] = data.inputArea
      .split("")
      .map((letter) => transformString(letter));

    // アスキーアート変換後の文字列
    let asciiArtArr: string[] = stringArr.map((string) =>
      toAsciiArt(string, data.widthOption)
    );

    // 横書き対応
    if (useHorizon) {
      const splitedArtsArr: string[][] = asciiArtArr.map((art) =>
        art.split("\n")
      );

      const transposedArtArr: string[] = splitedArtsArr[0]
        .map((_, i) => splitedArtsArr.map((row) => row[i]))
        .map((row) => row.join(""))
        .map((row) => row + "\n");

      asciiArtArr = transposedArtArr;
    }

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

  const handleClickCreateButton = (e: any) => {
    setUseHorizon(e.target.value === "horizon");

    // setUseHorizonを書き換えてからsubmitする
    setTimeout(() => {
      if (submitRef.current) {
        submitRef.current.click();
      }
    }, 0);
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
      <form onSubmit={handleSubmit(createArt)}>
        {/* 入力エリア */}
        <div>
          <input
            style={{ width: "100%" }}
            placeholder="例：ア　A　1　!　?　(　)・　♡"
            {...register("inputArea", {
              required: "入力してください！",
              validate: validateInput,
            })}
          />
          {errors.inputArea && <span>{errors.inputArea.message}</span>}
        </div>

        {/* オプションエリア */}
        {/* ラジオボタン(半角・全角) */}
        <div className="form__item">
          <div className="radioGroup">
            {widthOptions.map((item) => (
              <label className="radioGroup__label" key={item.value}>
                <input
                  className="radioGroup__radio"
                  type="radio"
                  {...register("widthOption", { required: true })}
                  value={item.value}
                  defaultChecked={item.key === 1}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
        {/* 生成ボタン */}
        <div>
          {submitButtons.map((button: SubmitButton) => (
            <button
              key={button.key}
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              value={button.value}
              onClick={handleClickCreateButton}
            >
              {button.label}
            </button>
          ))}

          <input type="submit" className="hidden" ref={submitRef} />
        </div>
      </form>

      {/* 結果 */}
      <div>
        <textarea
          // className={styles.result}
          style={{ width: "100%" }}
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
