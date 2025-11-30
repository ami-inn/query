
import { useQuery } from '@tanstack/react-query';

async function  fetchMovies(title:string) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network delay
        return { id: 1, title: title, directorId: 101 };
    
}

async function fetchDirector(directorId: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network delay
        return { id: directorId, name: `Director ${directorId}`, age: 50 + directorId };
    
}

async function fetchMovieDetails(title: string) {
    const movies = await fetchMovies(title);
    const director = await fetchDirector(movies.id);
    return {movies, director};
}

function useMovie(title:string) {
    return useQuery({
        queryKey: ['movie', title],
        queryFn: () => fetchMovieDetails(title),
       
    });
}

function useDirector(id:number) {
    return useQuery({
        queryKey: ['director', id],
        queryFn: () => fetchDirector(id),
        enabled: !!id, // only run the query if id is not null or undefined
    });
}

function useMovieWithdDetails(title:string) {
    const movie = useMovie(title);
    const directorId = movie.data?.movies.directorId;
    const director = useDirector(directorId!); // non-null assertion since enabled will handle null case
    return{
        movie,
        director
    }
}


const DependentQuery = () => {
    const {movie, director} = useMovieWithdDetails('Inception');

    if(movie.status === 'pending'){
        return <div>Loading movie...</div>
    }
    
    if(director.status === 'pending'){
        return <div>Loading director...</div>
    }

    if(movie.error){
        return <div>Error loading movie: {(movie.error as Error).message}</div>
    }

    if(director.error){
        return <div>Error loading director: {(director.error as Error).message}</div>
    }
    
  return (
    <div>
        <h1>Dependent Query Example</h1>
        <h2>Movie Details</h2>
        <p>Title: {movie.data?.movies.title}</p>
        <h2>Director Details</h2>
        <p>Name: {director.data?.name}</p>
        <p>Age: {director.data?.age}</p>
      
    </div>
  )
}

export default DependentQuery
