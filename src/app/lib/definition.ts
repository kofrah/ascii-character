export type Kind = "Hiragana" | "Katakana" | "Alphabet" | "Mark";

export type Vector = "horizon" | "vertical";

export type Width = "full" | "half";

export type Letter = {
  text: string;
  prounounce: string;
  unicode: string;
  art: string;
};

export type Lib = {
  kind: Kind;
  vector: Vector;
  width: Width;
  letters: Letter[];
};
