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
  });
}

const useQueryHook = () => {
  const { data, status } = useBook();
  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error occurred</div>;
  }
  return (
    <main>
      <h1>useQuery Hook</h1>

      <div>
        <h2>{data.title}</h2>
        <p>Authors: {data.authors.join(", ")}</p>
        <img src={data.thumbnail} alt={data.title} />
      </div>
    </main>
  );
};

export default useQueryHook;
