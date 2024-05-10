export type Letter = {
  text: string;
  unicode: string;
  vector: Vector;
  art: string;
};

export type Lib = {
  width: Width;
  letters: Letter[];
};

export type Inputs = {
  inputArea: string;
  widthOption: Width;
  vector: VectorLabel;
  submitButtonValue: any;
};
// 半角/全角セレクトボックスの型定義
export type Width = "full" | "half";

export type WidthLabel = "半角" | "全角";

export type WidthOption = {
  key: number;
  value: Width;
  label: WidthLabel;
};

export const widthOptions: WidthOption[] = [
  { key: 1, value: "half", label: "半角" },
  { key: 2, value: "full", label: "全角" },
];

// 生成ボタンの型定義
export type Vector = "both" | "horizon" | "vertical";

export type VectorLabel = "生成（ヨコ）" | "生成（タテ）";

export type SubmitButton = {
  key: number;
  value: Vector;
  label: VectorLabel;
};

export const submitButtons: SubmitButton[] = [
  { key: 1, value: "horizon", label: "生成（ヨコ）" },
  { key: 2, value: "vertical", label: "生成（タテ）" },
];
