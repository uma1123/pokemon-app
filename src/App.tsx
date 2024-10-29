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

          // 必要なデータを整形してreturnする
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            image:
              pokemonData.sprites?.other?.["official-artwork"]?.front_default ||
              "画像がありません",
            type: pokemonData.types?.[0]?.type?.name || "不明",
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
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "rock":
        return "bg-rock";
      case "ghost":
        return "bg-ghost";
      case "electric":
        return "bg-electric";
      case "bug":
        return "bg-bug";
      case "poison":
        return "bg-poison";
      case "normal":
        return "bg-normal";
      case "fairy":
        return "bg-fairy";
      case "fire":
        return "bg-fire";
      case "grass":
        return "bg-grass";
      case "water":
        return "bg-water";
      case "dark":
        return "bg-dark";
      case "psychic":
        return "bg-psychic";
      case "ground":
        return "bg-ground";
      case "steel":
        return "bg-steel";
      case "fighting":
        return "bg-fighting";
      case "ice":
        return "bg-ice";
      case "dragon":
        return "bg-dragon";
      default:
        return "bg-normal"; // デフォルトの色を指定
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
