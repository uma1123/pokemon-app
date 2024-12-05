import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBackgroundColor } from "./utils"; // 共通関数をインポート

interface PokemonDetais {
  id: number;
  name: string;
  image: string;
  type: string;
  height: number;
  weight: number;
  move: string;
}

function Details() {
  const { id } = useParams<{ id: string }>();
  const [pokemons, setPokemons] = useState<PokemonDetais | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = res.data;

        const speciesRes = await axios.get(data.species.url);
        const japaneseName =
          speciesRes.data.names.find(
            (nameObj: { language: { name: string }; name: string }) =>
              nameObj.language.name === "ja"
          )?.name || data.name;

        const japaneseTypeRes = await Promise.all(
          data.types.map(async (typeObj: { type: { url: string } }) => {
            const typeRes = await axios.get(typeObj.type.url);
            return typeRes.data.names.find(
              (nameObj: { language: { name: string }; name: string }) =>
                nameObj.language.name === "ja"
            )?.name;
          })
        );

        setPokemons({
          id: data.id,
          name: japaneseName,
          image:
            data.sprites?.other?.["official-artwork"]?.front_default ||
            "画像がありません",
          type: japaneseTypeRes[0] || "不明",
          height: data.height,
          weight: data.weight,
          move: data.moves[0]?.move.name || "不明",
        });
      } catch (error) {
        console.log("エラー", error);
      }
    };
    fetchData();
  }, [id]);

  if (!pokemons)
    return <div className="text-center text-2xl">読み込み中...</div>;

  // タイプに基づいた背景色を取得
  const backgroundColorClass = getBackgroundColor(pokemons.type);

  return (
    <div
      className={`flex flex-col items-center p-8 ${backgroundColorClass} rounded-lg shadow-lg w-96 mx-auto`}
    >
      <h2 className="text-3xl font-bold text-black mb-4">{pokemons.name}</h2>
      <img
        src={pokemons.image}
        alt={pokemons.name}
        className="w-48 h-48 rounded-full shadow-xl mb-6 border-2 border-black"
      />
      <div className="text-lg text-black">
        <p className="mb-2">タイプ: {pokemons.type}</p>
        <p className="mb-2">高さ: {pokemons.height / 10} m</p>
        <p className="mb-2">重さ: {pokemons.weight / 10} kg</p>
        <p className="mb-4">最初のわざ: {pokemons.move}</p>
      </div>
      <a
        href="/"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        戻る
      </a>
    </div>
  );
}

export default Details;
