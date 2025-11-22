import { useQuery } from "@tanstack/react-query"
import { useState } from "react"


function useRepos (sort:any){
    return useQuery({
        queryKey:["repos",{sort:sort}],
        queryFn: async()=>{
            const res = await fetch(`https://api.github.com/orgs/Tanstack/repos?sort=${sort}`)
            if(!res.ok){
                throw new Error("Network response was not ok")
            }
            return res.json()
        }
    })
}

// if we pass the sort as parmeter to the userepos hook it will not work as expected because the query key is same.
// we dont want to refetch to prevent the rerendering
// to solve this
// the solution is to use the qauery key with parameter
// is it like useeffect
// query key react query hashes keys deterministically allowing to use object and arrays as keys


const QueryDependency = () => {
    const [sort, setSort] = useState("created")
    const {data, error, isLoading} = useRepos(sort)



  return (
    <div>
        <h1>Query Dependency</h1>
        <select value={sort} onChange={(e)=> setSort(e.target.value)}>
            <option value="created">Created</option>
            <option value="updated">Updated</option>
            <option value="pushed">Pushed</option>
            <option value="full_name">Full Name</option>
        </select>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error occurred: {(error as Error).message}</p>}
        <ul>
            {data?.map((repo:any)=>(
                <li key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                        {repo.name}
                    </a>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default QueryDependency
