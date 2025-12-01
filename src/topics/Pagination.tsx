import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryClient } from "../main";

function fetchaRepos(sort: string, page: number = 1, per_page: number = 10) {
  return fetch(
    `https://api.github.com/orgs/facebook/repos?sort=${sort}&page=${page}&per_page=${per_page}`
  ).then((res) => res.json());
}

// instead of luser going next page and showing loading and display data we can use placeholder data to show data from cache while new data is being fetched

// for better experience always fetch the next page in background
function getReposQueryOptions(sort: any, page: number) {
  return {
    queryKey: ["repos", sort, page],
    queryFn: () => fetchaRepos(sort, page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  };
}
function useRepos(sort: any, page: number) {

    
  //   return useQuery({
  //     queryKey: ["repos", sort, page],
  //     queryFn: () => fetchaRepos(sort, page),
  //     staleTime: 5 * 60 * 1000, // 5 minutes
  //     placeholderData: (oldData) => {
  //       return oldData; // return previous page data as placeholder while new data is being fetched
  //     },
  //   });

//   add useeffect for prefetching next page data
useEffect(() => {
    queryClient.prefetchQuery(
        getReposQueryOptions(sort, page + 1)
    )
}, [sort, page])

  return useQuery({
    ...getReposQueryOptions(sort, page),
    placeholderData: (oldData) => {
      return oldData; // return previous page data as placeholder while new data is being fetched
    },
  });
}

function ReposList({
  sort,
  page,
  setPage,
}: {
  sort: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { data, error, isLoading, isPlaceholderData } = useRepos(sort, page);

  if (isLoading) {
    return <p>Loading repos...</p>;
  }

  if (error) {
    return <p>Error occurred: {(error as Error).message}</p>;
  }

  return (
    <ul
      style={{
        opacity: isPlaceholderData ? 0.5 : 1,
      }}
    >
      {data?.map((repo: any) => (
        <li key={repo.id}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </li>
      ))}
      <div>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1 || isPlaceholderData}
        >
          Previous
        </button>
        <span> Page {page} </span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={isPlaceholderData}
        >
          Next
        </button>
      </div>
    </ul>
  );
}

const Pagination = () => {
  const [selection, setSelection] = useState("created");
  const [page, setPage] = useState(1);
  const handleSort = (sort: any) => {
    setSelection(sort);
    setPage(1);
  };
  return (
    <div>
      <h1>Pagination Example</h1>
      <div>
        <button onClick={() => handleSort("created")}>Sort by Created</button>
        <button onClick={() => handleSort("updated")}>Sort by Updated</button>
        <button onClick={() => handleSort("pushed")}>Sort by Pushed</button>
        <button onClick={() => handleSort("full_name")}>
          Sort by Full Name
        </button>
      </div>
      <ReposList sort={selection} page={page} setPage={setPage} />
    </div>
  );
};

export default Pagination;
