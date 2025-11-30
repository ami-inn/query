function fetchPosts() {
  return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
    res.json()
  );
}

function fetchPost(id: number) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  );
}
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../main";

function usePostList() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

function usePost(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

function usePostSecond(path: number) {
    return useQuery({
        ...getPostQueryOptions(path),
        // initialData: () => {
        //     return queryClient.getQueryData(["post", path])?.find((post:any)=>post.id===path);
        // }
        placeholderData: () => {
            return (queryClient.getQueryData(["posts"]) as any[])?.find((post:any)=>post.id===path);
        }
    })
}

function getPostQueryOptions(id: number) {
  return {
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  };
}

function PostList({ setPath }: { setPath: (path: string) => void }) {
  const { data, error, isLoading } = usePostList();

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error occurred: {(error as Error).message}</p>;
  }

  return (
    <ul>
      {data?.map((post: any) => (
        <li
          key={post.id}
          onClick={() => setPath(`/posts/${post.id}`)}
          onMouseEnter={() => {
            queryClient.prefetchQuery(
              //     {
              //   queryKey: ["post", post.id],
              //   queryFn: () => fetchPost(post.id),
              //   staleTime: 5 * 60 * 1000, // 5 minutes
              // }
              getPostQueryOptions(post.id)
            );
          }}
        >
          {post.title}
        </li>
      ))}
    </ul>
  );
}

function PostDetails({ id }: { id: number }) {
  const { data, error, isLoading,isPlaceholderData } = usePost(id);
  console.log(isPlaceholderData,'isPlaceholderData');

  if (isLoading) {
    return <p>Loading post details...</p>;
  }

  if (error) {
    return <p>Error occurred: {(error as Error).message}</p>;
  }

  return (
    <div>
      <h2>{data?.title}</h2>
      <p>{data?.body}</p>
    </div>
  );
}

export default function Blog() {
  const [path, setPath] = useState("");
  return (
    <div>
      {path ? (
        <PostDetails id={parseInt(path.split("/posts/")[1])} />
      ) : (
        <PostList setPath={setPath} />
      )}
    </div>
  );
}

// instead of user clicking and specific post to fetch detail we fetch it hover type its called prefetching
