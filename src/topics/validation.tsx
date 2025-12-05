import {z} from 'zod'
import { useQuery } from '@tanstack/react-query'; 

const pokemonSchema = z.object({    
    name: z.string(),
    id: z.string(),
    sprites: z.object({
        front_default: z.string().url()
    }).optional()
});

async function fetchPokemon(id: number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return pokemonSchema.parse(data); // Validate and parse the data
}

function usePokemon(id: number) {
    return useQuery({
        queryKey: ['pokemon', id],
        queryFn: () => fetchPokemon(id),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

function Pokemon({ id }: { id: number }) {
    const { data, isLoading, error } = usePokemon(id);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }
    return (
        <div>
            <h2>{data?.name}</h2>
            {data?.sprites?.front_default && (
                <img src={data.sprites.front_default} alt={data.name} />
            )}
        </div>
    );
}

export default Pokemon;
