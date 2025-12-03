import { useInfiniteQuery } from "@tanstack/react-query";
import {useIntersectionObserver} from '@uidotdev/usehooks'
import { useEffect } from "react";

function fetchPosts(page: number = 1) {
  return fetch(
    `https://api.github.com/orgs/facebook/repos?per_page=10&page=${page}`
  ).then((res) => res.json());
}

function usePosts() {
  return useInfiniteQuery({
    queryKey: ["infiniteRepos"],
    queryFn: ({ pageParam }) => fetchPosts(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if ((lastPage as any[]).length === 0) {
        return undefined; // no more pages
      }
      return (lastPageParam as number) + 1; // next page number
    },
    getPreviousPageParam: (firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined; // no previous page
      }
      return (firstPageParam as number) - 1; // previous page number
    },
  });
}
// usequery
// returns whatever data is in the cache at the querykey
// useinfinitequery
// returns both the datga and the page that data is associated with
// {
//     "data":{
//         "pages":[
//             [/* page 1 data */],
//             [/* page 2 data */]
//         ],
//         "pageParams":[1,2 ]
//     }
// }
// if you want flat array u can use data.pages.flat()

export default function Blog() {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();
  const [ref,entry] = useIntersectionObserver()

  useEffect(() => {
    if(entry?.isIntersecting && hasNextPage && !isFetchingNextPage){
      fetchNextPage();
    }
  }, [entry, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {(error as Error).message}</p>;
  }

  return (
    <div>
      <h1>Facebook Repos (Infinite Query)</h1>
      <ul>
        {data?.pages.flat().map((repo: any) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
      <div>
        {/* <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "No more repos"}
        </button> */}
      </div>
    </div>
  );
}

// api response look like this
// {
//     "data": [],
//     "currentPage": 1,
//     "totalPages": 5
//     "totalItems": 50
// }