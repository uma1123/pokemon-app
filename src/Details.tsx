import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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

        //日本語のタイプを取得
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

  if (!pokemons) return <div>読み込み中...</div>;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl">{pokemons.name}</h2>
      <img src={pokemons.image} alt={pokemons.name} className="w-48 h-48" />
      <div className="text-lg mt-4">
        <p>タイプ： {pokemons.type}</p>
        <p>高さ： {pokemons.height}</p>
        <p>重さ： {pokemons.weight}</p>
        <p>最初のわざ: {pokemons.move}</p>
      </div>
    </div>
  );
}

export default Details;
