import axios from "axios";
import Card from "./card.tsx";
import { useEffect, useState } from "react";

// ポケモンのデータの型を指定
interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

export default function APP() {
  // ポケモンのデータを格納
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  // オフセットを指定
  const [offset, setOffset] = useState(0);
  // 一度に取得するデータの数を指定
  const limit = 20;

  // ポケモンのデータを取得する関数
  const getPokemon = async () => {
    try {
      // APIからデータを取得
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      // 取得したデータを定数に格納
      const data = response.data;

      // データの詳細を非同期で処理
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          // 各ポケモンの詳細情報を取得
          const res = await axios.get(pokemon.url);
          const pokemonData = res.data;

          //ポケモン日本語の取得
          const speciesRes = await axios.get(pokemonData.species.url);
          const japaneseName =
            speciesRes.data.names.find(
              (nameObj: { language: { name: string }; name: string }) =>
                nameObj.language.name === "ja"
            )?.name || pokemonData.name;

          //日本語のタイプを取得
          const japaneseTypeRes = await Promise.all(
            pokemonData.types.map(
              async (typeObj: { type: { url: string } }) => {
                const typeRes = await axios.get(typeObj.type.url);
                return typeRes.data.names.find(
                  (nameObj: { language: { name: string }; name: string }) =>
                    nameObj.language.name === "ja"
                )?.name;
              }
            )
          );

          // 必要なデータを整形してreturnする
          return {
            id: pokemonData.id,
            name: japaneseName,
            image:
              pokemonData.sprites?.other?.["official-artwork"]?.front_default ||
              "画像がありません",
            type: japaneseTypeRes[0] || "不明",
          };
        })
      );

      // 新しく取得した情報を既存のデータの後ろに追加
      setAllPokemons((prev) => [
        ...prev,
        ...pokemonDetails.filter(
          (pokemon) => !prev.some((p) => p.id === pokemon.id)
        ),
      ]);
    } catch (error) {
      console.error("エラー:", error);
      alert("ポケモンのデータを取得できませんでした。"); // ユーザーにエラーを通知
    }
  };

  // 初回マウント時及びオフセットが変わるたびに関数を呼び出す。
  useEffect(() => {
    getPokemon();
  }, [offset]);

  /*Tailwind CSSでは、動的にクラス名を生成することができるものの、`bg-${pokemon.type}`のような方法は動的にクラス名を評価しないため、期待通りの効果が得られない*/

  //クラス名をハードコーディング
  // クラス名を日本語タイプ対応に
  const getBackgroundColor = (type: string) => {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-2">
      <h1 className="text-2xl mb-4">ポケモン図鑑</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-wrap items-center justify-center">
          {allPokemons.map((pokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              image={pokemon.image}
              name={pokemon.name}
              type={pokemon.type}
              className={getBackgroundColor(pokemon.type)}
            />
          ))}
        </div>
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => setOffset((prev) => prev + limit)}
      >
        次のポケモンを表示
      </button>
    </div>
  );
}
