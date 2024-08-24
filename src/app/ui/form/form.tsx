"use client";

import { libFull } from "@/app/lib/lib_full";
import {
  Inputs,
  Letter,
  SubmitButton,
  Vector,
  Width,
  submitButtons,
  widthOptions,
} from "@/app/lib/types/definition";
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
    ".#Dekamoji\n　┏━┏┳┓　┏┓　　　　┏┓　\n　┗━┗┻┛┏┛┗━━┓　┃┃　\n┏━━━━┓┗┓┏━┓┃　┃┃　\n┗━┓┏━┛　┃┃　┃┃　┗┛　\n　┏┛┛　　┏┛┛┏┛┃　┏┓　\n　┗┛　　　┗┛　┗━┛　┗┛　"
  );

  const submitRef = useRef<HTMLInputElement>(null);

  // バリデーション関数
  const validateInput = (value: string) => {
    // ひらがな、カタカナ、アルファベット、特定の記号のみを許可する正規表現
    const regex = /^[ぁ-んァ-ンA-Za-z0-9０-９:：！!？?ー\-♡()（）・]+$/;
    return regex.test(value) || "使えない文字が含まれています。";
  };

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
  const toAsciiArt = (char: string, width: Width, vector: Vector): string => {
    console.log("vector", vector);

    // TODO:半角対応
    const letters: Letter[] = libFull.letters;

    // 結果
    let art: string | undefined;

    // 最初に"both"に一致する要素を検索
    art = letters.find(
      (letter) => letter.text === char && letter.vector === "both"
    )?.art;

    // "both"に一致する要素がない場合、"horizon"に一致する要素を検索
    art = art
      ? art
      : letters.find(
          (letter) => letter.text === char && letter.vector === vector
        )?.art;

    // 結果
    if (art) {
      return art;
    } else {
      alert("デカ文字が存在しません！");
      return "";
    }
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

    // ひらがな -> カタカナ, a -> A
    const stringArr: string[] = data.inputArea
      .split("")
      .map((letter) => transformString(letter));

    const vector: Vector = useHorizon ? "horizon" : "vertical";

    // 一文字ずつアスキーアートに変換
    let asciiArtArr: string[] = stringArr.map((string) =>
      toAsciiArt(string, data.widthOption, vector)
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
    asciiArtArr.unshift(".#Dekamoji\r");

    // 文字コードをAAに変換
    const asciiArt: string = asciiArtArr.join("");

    setResult(asciiArt);
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

  // ツイートボタン押下
  const handleTweet = async () => {
    console.log(result);
    try {
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        result
      )}`;
      window.open(tweetUrl, "_blank");
    } catch (err) {
      console.log("Tweet Failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(createArt)}>
        {/* 入力エリア */}
        <div>
          <input
            style={{ width: "100%" }}
            className="py-2.5 px-5 
            me-2 mb-2 
            text-base font-medium text-gray-900 
            focus:outline-none bg-white rounded-lg border border-gray-200
             hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200
             dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            placeholder="ここに文字を入力"
            {...register("inputArea", {
              required: "入力してください！",
              validate: validateInput,
            })}
          />
          {errors.inputArea && (
            <span className="text-red-500">{errors.inputArea.message}</span>
          )}
        </div>
        <div className={styles.note}>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl underline">
            対応文字：カタカナ、英数字、記号（! ? ( ) ・ ♡）
          </p>
        </div>

        {/* オプションエリア */}
        {/* ラジオボタン(半角・全角) */}
        <div className="form__item">
          <div className="radioGroup hidden">
            {widthOptions.map((item) => (
              <label className="radioGroup__label" key={item.value}>
                <input
                  className="radioGroup__radio w-5"
                  type="radio"
                  {...register("widthOption", {
                    required: true,
                    disabled: true,
                  })}
                  value={item.value}
                  defaultChecked={item.key === 2}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
        {/* 生成ボタン */}
        <div className="flex justify-center">
          {submitButtons.map((button: SubmitButton) => (
            <button
              key={button.key}
              type="button"
              className="py-2.5 px-5 me-2 w-32 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 
              hover:bg-gray-100 hover:text-blue-700
              focus:z-10 focus:ring-4 focus:ring-gray-200 
              dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
          className="whitespace-pre
          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
      <div className="flex justify-center">
        <button
          onClick={handleCopy}
          className="py-2.5 px-5 w-32 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          コピー
        </button>
        <button
          onClick={handleTweet}
          className="py-2.5 px-5 w-32 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          ポスト
        </button>
      </div>
    </>
  );
}
