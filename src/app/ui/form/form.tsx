"use client";

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

  // 変換ボタン押下
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setResult(data.form);
  };

  // ランダム作成ボタン押下
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
        {/* include validation with required or other standard HTML validation rules */}
        <input
          {...register("form", {
            required: "入力してください！",
            maxLength: {
              value: 4,
              message: "4文字以内でお願いします（；；）",
            },
          })}
        />
        {/* errors will return when field validation fails  */}
        {errors.form && <span>{errors.form.message}</span>}
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
        {/* 変換 */}
        <div>
          <input type="submit" value="変換" />
        </div>
      </form>
      {/* 結果 */}
      <div>
        <textarea
          name=""
          id=""
          placeholder="結果"
          ref={formBRef}
          value={result}
          onChange={(e) => setResult(e.target.value)}
        ></textarea>
      </div>
      {/* 結果をコピー */}
      <div>
        <button onClick={handleCopy}>COPY</button>
      </div>
    </>
  );
}
