export type Kind = "Hiragana" | "Katakana" | "Alphabet" | "Mark";

export type Letter = {
  text: string;
  prounounce: string;
  unicode: string;
  art: string;
};

export type Lib = {
  kind: Kind;
  letters: Letter[];
};
