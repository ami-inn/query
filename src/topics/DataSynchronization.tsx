
import { useQuery } from "@tanstack/react-query";

interface Book {
  title: string;
  authors: string[];
  thumbnail: string;
}

async function getData(): Promise<Book> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "The Hobbit",
        authors: ["andrew", "john"],
        thumbnail: "http://ui.dev/images/courses/query/hobbit.jpg",
      });
    }, 1000);
  });
}

function useBook() {
  return useQuery({
    queryKey: ["book"],
    queryFn: getData,
    staleTime: 5000, // data considered fresh for 5 seconds
    refetchOnMount: false, // don't refetch on remount if data is fresh
    refetchOnWindowFocus: false, // don't refetch on window focus if data is fresh  
    refetchOnReconnect: false, // don't refetch on reconnect if data is fresh
  });
}
const DataSynchronization = () => {
    const { data, status } = useBook();
  return (
    <main>
      <h1>Data Synchronization</h1>

      {status === "pending" && <div>Loading...</div>}
      {status === "error" && <div>Error occurred</div>}
      {status === "success" && (
        <div>
          <h2>{data.title}</h2>
          <p>Authors: {data.authors.join(", ")}</p>
          <img src={data.thumbnail} alt={data.title} />
        </div>
      )}
    </main>

  )
}

export default DataSynchronization
