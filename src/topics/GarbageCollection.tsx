import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Issue {
  id: number;
  title: string;
  html_url: string;
}

async function fetchIssues(search: string): Promise<Issue[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: `Issue related to ${search} 1`,
          html_url: "https://github.com/example/repo/issues/1",
        },
        {
          id: 2,
          title: `Issue related to ${search} 2`,
          html_url: "https://github.com/example/repo/issues/2",
        },
      ]);
    }, 2000);
  });
}

function useIssues(search: string) {
  return useQuery({
    queryKey: ["issues", search],
    queryFn: () => fetchIssues(search),
    enabled: !!search, // only run the query if search is not empty
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

function IssuesList({ search }: { search: string }) {
  const { data, error, isLoading, fetchStatus } = useIssues(search);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (fetchStatus === "fetching") {
    return <p>Fetching...</p>;
  }

  if (error) {
    return <p>Error occurred: {(error as Error).message}</p>;
  }

  if (!data) {
    return <p>No results</p>;
  }

  return (
    <ul>
      {data.map((issue: any) => (
        <li key={issue.id}>
          <a href={issue.html_url} target="_blank" rel="noreferrer">
            {issue.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

const GarbageCollection = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1>Garbage Collection in React Query</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search issues"
      />
      <button onClick={() => setSearch("")}>Clear Search</button>
      <IssuesList search={search} />
    </div>
  );
};

export default GarbageCollection;
