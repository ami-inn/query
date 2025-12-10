
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
const fetchRepoData = async ()=>{
    const res = await fetch('https://api.github.com/orgs/facebook/repos');
    if(!res.ok){
        throw new Error('Network response was not ok')
    }
    return res.json();
}

const AppErrorBoundary = ({children}: {children: React.ReactNode})=>{
    return(
        <div>
            {children}
        </div>
    )
}


function useRepos(){
    return useSuspenseQuery({
        queryKey: ['suspense-repos'],
        queryFn: fetchRepoData,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

function ReposList(){
    const {data} = useRepos();

    return (
        <div>
            <h2>Facebook Repositories (Suspense)</h2>
            <ul>
                {data.map((repo: any) => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
        </div>
    )
}

// we dont need to check the is loading is status anymore
function App(){
    return(
        <AppErrorBoundary>
            <Suspense fallback={<div>Loading repos...</div>}>
            <ReposList/>
            </Suspense>
        </AppErrorBoundary>

    )
}

export default App;

// how muny children components are wrapped inside suspense will use suspense for data fetching
// once full data is fetched the full tree will be rendered
// to avoid this stick to one query per component or to use another provided hook usesuspensequeries which can fire off multiple suspense queries in parallel
