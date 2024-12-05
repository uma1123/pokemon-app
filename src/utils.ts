//クラス名をハードコーディング
// クラス名を日本語タイプ対応に
export const getBackgroundColor = (type: string) => {
  switch (type) {
    case "いわ":
      return "bg-pokemon-rock";
    case "ゴースト":
      return "bg-pokemon-ghost";
    case "でんき":
      return "bg-pokemon-electric";
    case "むし":
      return "bg-pokemon-bug";
    case "どく":
      return "bg-pokemon-poison";
    case "ノーマル":
      return "bg-pokemon-normal";
    case "フェアリー":
      return "bg-pokemon-fairy";
    case "ほのお":
      return "bg-pokemon-fire";
    case "くさ":
      return "bg-pokemon-grass";
    case "みず":
      return "bg-pokemon-water";
    case "あく":
      return "bg-pokemon-dark";
    case "エスパー":
      return "bg-pokemon-psychic";
    case "じめん":
      return "bg-pokemon-ground";
    case "はがね":
      return "bg-pokemon-steel";
    case "かくとう":
      return "bg-pokemon-fighting";
    case "こおり":
      return "bg-pokemon-ice";
    case "ドラゴン":
      return "bg-pokemon-dragon";
    default:
      return "bg-pokemon-normal"; // デフォルトの色を指定
  }
};
