import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function useIssues(search: string) {
  return useQuery({
    queryKey: ["issues", search],
    queryFn: async () => {
      const res = await fetch(
        `https://api.github.com/search/issues?q=${search}+repo:facebook/react`
      );
      const data = await res.json();
      return data.items;
    },
    enabled: !!search, // only run the query if search is not empty
  });
}

//   cant do if conditional hooks instead we can use enabled property in the usequery options

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

const FetchingOnDemand = () => {
    const [search, setSearch] = useState("");
    return (
    <div>
        <h1>Fetching On Demand</h1>
        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search GitHub issues"
        />
        {
            search ? <IssuesList search={search} /> : <p>Please enter a search term.</p>
        }
       
    </div>
  );
};

export default FetchingOnDemand;


// status === "pending" means there is no data in the cache
// fetchStatus === "fetching" means there is data in the cache but a background refetch is in progress