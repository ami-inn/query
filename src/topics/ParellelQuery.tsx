import { useQueries, useQuery } from "@tanstack/react-query";

function fetchRepos (){
    return fetch('https://api.github.com/orgs/facebook/repos')
    .then(res => res.json())
}
function fetchMembers (){
    return fetch('https://api.github.com/orgs/facebook/members')
    .then(res => res.json())
}


// this will give you the flexibility to run multiple queries in parallel and cache their results independently

function useReposAndMembers() {
    return useQueries({
        queries: [
            {
                queryKey: ['repos'],
                queryFn: fetchRepos
            },
            {
                queryKey: ['members'],
                queryFn: fetchMembers
            }
        ]
    })
}

function useRepos(){
    return useQuery({
        queryKey: ['repos'],
        queryFn: fetchRepos
    })
}

function useIssues(repos:any){
    return useQueries({
        queries:repos?.map((repo:any)=>({
            queryKey:['issues', repo.name],
            queryFn: async () => {
                const res = await fetch(`https://api.github.com/repos/facebook/${repo.name}/issues`);
                return res.json();
            }
        }))??[], // return empty array if repos is undefined,
        combine:(issues:any)=>{
            interface IssueQueryResult {
                data?: any[];
            }

            const totalIssues = issues.map(({ data }: IssueQueryResult) => data?.length ?? 0).reduce((a: number, b: number) => a + b, 0);
            return {totalIssues,issues};
        }

    })
}

// example to combine multiple queries results

const ParellelQuery = () => {
    const [reposQuery, membersQuery] = useReposAndMembers();
    const areAllPending = [reposQuery, membersQuery].every(query => query.isLoading);
    console.log(areAllPending, 'all pending');

    if (reposQuery.isLoading) {
        return <div>Loading Repos...</div>;
    }

    if (membersQuery.isLoading) {
        return <div>Loading Members...</div>;
    }

    if (reposQuery.error) {
        return <div>Error loading repos: {(reposQuery.error as Error).message}</div>;
    }

    if (membersQuery.error) {
        return <div>Error loading members: {(membersQuery.error as Error).message}</div>;
    }

    return (
        <div>
            <h2>Facebook Repositories</h2>
            <ul>
                {reposQuery.data.map((repo: any) => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>

            <h2>Facebook Members</h2>
            <ul>
                {membersQuery.data.map((member: any) => (
                    <li key={member.id}>{member.login}</li>
                ))}
            </ul>
        </div>
    );
};

export default ParellelQuery;


