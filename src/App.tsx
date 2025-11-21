import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const App = () => {
  const [id, setId] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return res.json();
    },
  });
  return (
    <div>
      <h1>Pokemon Info</h1>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
        min={1}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {data && (
        <div>
          <h2>{data.name}</h2>
          <img
            src={data.sprites.front_default}
            alt={data.name}
            width={100}
            height={100}
          />
          <p>Height: {data.height}</p>
          <p>Weight: {data.weight}</p>
        </div>
      )}
    </div>
  );
};

export default App;
