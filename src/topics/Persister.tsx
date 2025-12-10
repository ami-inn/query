
import { QueryClient, useQueries } from "@tanstack/react-query";
import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister'
import {  experimental_createQueryPersister, PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { defaultShouldDehydrateQuery } from "@tanstack/react-query";
import { removeOldestQuery } from "@tanstack/react-query-persist-client";
import { useIsRestoring } from "@tanstack/react-query";



const addPost = (data:any) =>{
    // dummy api call to add post
    return data
}

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            gcTime:1000 * 60 * 60 *12, // 12 hour
        }
    }
})

//  set default mutation options for all posts mutations
queryClient.setMutationDefaults(['posts'],{
    mutationFn:addPost,
})

// create a persist gate component to show fallback ui while restoring persisted queries
// this is optional but good for better user experience
export function PersistGate({children,fallBack}:{
    children:React.ReactNode,
    fallBack:React.ReactNode
}){
    const isRestoring = useIsRestoring();
    if(isRestoring){
        return <>{fallBack}</>
    }
    return <>{children}</>
}
// 

const persister = createSyncStoragePersister({
    storage: window.localStorage, // you can also use sessionStorage or any other storage mechanism
    key: 'REACT_QUERY_PERSISTER',
    // retry:({persistedClient,error,errorCount})=>{
    //     const sortedQueries = [...persistedClient.clientState.queries].sort((a,b)=>b.state.dataUpdatedAt - a.state.dataUpdatedAt);
    //     const newestQueries = sortedQueries[0]

    //     // abort if retr y didnt work or ther is no query
    //     if(!newestQueries || errorCount >=3){
    //         return false
    //     }
    //     return {
    //         ...persistedClient,
    //         clientState:{
    //             ...persistedClient.clientState,
    //             queries: [newestQueries] // keep only the newest query and remove others
    //         }
    //     }

    // } // custom retry logic to remove old queries if persisting fails due to size limit
    retry:removeOldestQuery // built in function to remove oldest queries on persisting failure
})


export default function Persister() {
    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister,
                maxAge: 1000 * 60 * 60 * 24, // 24 hours // data older than this will be garbage collected
                dehydrateOptions:{
                    // one option here is shulddeDehydrateQuery we can use this to filter out which queries to persist
                    shouldDehydrateQuery: (query) => {
                        // for example we can persist only queries with specific key
                        // return query.queryKey[0] === 'repos'
                        // return true // persisting all queries
                        return defaultShouldDehydrateQuery(query)  && query.meta?.persist !== false // default behaviour only persist successful queries
                    }
                }
             }}

             onSuccess={()=>{
                // react query will call this function when persisting is successful
                return queryClient.resumePausedMutations() // resume any paused mutations after persisting is done
             }}
            
        >
            <PersistGate fallBack={<div>Restoring previous session...</div>}>
                {/* your app components go here */}
                <div>

                </div>
            </PersistGate>
        </PersistQueryClientProvider>
    )
}

// persister queryclient is an global provider its going to effect all the queries used inside the app
// suppose we have sensitive data we dont want to persist we can use the option dehydrateOptions to filter out those queries

// or we can use meta field in query to mark which queries to persist

// userQuery({
//     queryKey: ['sensitiveData'],
//     queryFn: fetchSensitiveData,
//     meta: {
//         persist: false // mark this query as not to be persisted
//     }
// })

// then in dehydrateOptions we can check for this meta field
// shouldDehydrateQuery: (query) => {
//     return query.meta?.persist === true // only persist queries marked with persist: true
// }

// another case is what happen if the query is not successfull should we persist 

// defaultShouldDehydrateQuery only persits successful queries

// useQuery({
//     queryKey: ['sensitiveData'],
//     queryFn: fetchSensitiveData,
//     persister:experimental_createQueryPersister({
//         storage:localStorage
//     })
// }) // we can also create persister per query but its not recommended its better to have a global persister for the app