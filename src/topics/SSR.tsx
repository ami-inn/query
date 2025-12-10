import { defaultShouldDehydrateQuery, dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";

const fetchRepos = async () => {
    const res = await fetch('https://api.github.com/orgs/facebook/repos');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
}
// server component
export default async function Home() {
    
    // const data = await fetchRepos(); first way

    // we can create an queryclient on server side and prefetch the data and pass it as initial data to client component
    const queryClient = new QueryClient({
        // defaultOptions:{
        //     dehydrate:{
        //         shouldDehydrateQuery:(quuery)=>defaultShouldDehydrateQuery(quuery) || quuery.state.status === 'pending' // also dehydrate queries with error status
        //     }
        // }
        // customize dehydrate to include pending queries as well
    });
    await queryClient.prefetchQuery({
        queryKey: ['ssr-repos'],
        queryFn: fetchRepos,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return (
        // <div>
        //     <h1>Facebook Repositories (SSR)</h1>
        //     <ul>
        //         {data.map((repo: any) => (
        //             <li key={repo.id}>{repo.name}</li>
        //         ))}
        //     </ul>
        // </div> // SSR way of fetching data and passing as initial data to client component
        <main>
            {/* <Repo initialData={data}/>  */} // first way
            <HydrationBoundary state={dehydrate(queryClient)}>
                {/* the hydration boundary ensures that the prefetched data is available to the client */}
                <Repo />
            </HydrationBoundary>
        </main>
    );

}

// first way of passing data to client component
// export function Repo({initialData}: {initialData: any}) {
//     const {data} = useQuery({
//         queryKey: ['ssr-repos'],
//         queryFn: fetchRepos,
//         initialData: initialData,
//         staleTime: 5 * 60 * 1000, // 5 minutes
//     })

//     return(
//         <div>
//             <h2>Facebook Repositories (SSR)</h2>
//             <ul>
//                 {data.map((repo: any) => (
//                     <li key={repo.id}>{repo.name}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// this approach workd for staticaly generated pages as well as server side rendered pages if the data changes it will not be refetched on client side
// but not for pages that are dynamically rendered


export function Repo() {
    const { data } = useQuery({
        queryKey: ['ssr-repos'],
        queryFn: fetchRepos,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })

    return (
        <div>
            <h2>Facebook Repositories (SSR)</h2>
            <ul>
                {data.map((repo: any) => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
        </div>
    )
}
// fast page loads as data is pre-fetched on server and sent to client along with html
// better for seo as data is available on initial load
// less loading spinners as data is pre-fetched
// but increased server load as server has to fetch data for each request
// not suitable for highly dynamic data as data may be stale by the time it reaches client


// for streaming remove async from the home
// isntead of usequery use usesuspensequery in the client component
// third whrap the component in suspense boundary

// streaming is pain to implement with data fetching libraries like react query
// @tanstack/react-query-next-experimental has built in support for streaming with react query and nextjs