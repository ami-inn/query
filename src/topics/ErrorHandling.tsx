import { QueryCache, QueryClient, useQuery } from "@tanstack/react-query";

class HTTPError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}


const reposQuery = useQuery({
    queryKey: ['repos'],
    queryFn: async () => {
        const response = await fetch('https://api.github.com/orgs/tanstack/repos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    },
    // retry: 2, // number of retry attempts // failure count and error are passed to the retry function
    retry:(failureCount, error) =>{
      if(error instanceof HTTPError && error.status === 500){
          return failureCount < 3; // retry up to 3 times for server errors
      }
      
      return false; // do not retry after 3 attempts
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // exponential backoff
    // throwOnError:true // to throw the error instead of setting the status to error so error boundaries can catch it
    throwOnError:(error,query) => {
        // only throw for certain errors
        if(error instanceof HTTPError && error.status === 500){
            return true;
        }
        return false;
    }
})

// retryattempt 1: 1000ms we can use show this taking longer time to the user

// one is use status=== 'error' to show error message
// another is use error boundary when a component is failed use the fallback UI
{/* <ErrorBoundary fallback={<DashboardError/>} >
<Dahsboard/>
</ErrorBoundary> */}
// u can use npm i  react-error-boundary

// Error boundary will catch the error and show the fallback UI
// it will unmount the component tree inside it and remount when the error is resolved

// reset the error boundary when retrying
// <QueryErrorResetBoundary> from react query
// it will reset the error boundary when the query is retried
// <QueryErrorResetBoundary>
//   {({ reset })=>(
//     <ErrorBoundary
//       onReset={reset}
//       fallback={<DashboardError/>}
//     >
//       <Dashboard/>
//     </ErrorBoundary>
//   )}
// </QueryErrorResetBoundary>

// fallback ui can access the reset function to reset the error boundary

// to control the querycache
const queryclient = new QueryClient({
    queryCache: new QueryCache({
        onError:(error,query)=>{
            // toast.error(`Error in query ${query.queryKey}: ${(error as Error).message}`);
        }

    }),
    defaultOptions:{
        queries:{
            throwOnError:(error,query)=>{
                if(error instanceof HTTPError && error.status === 500){
                    // toast.error(`Server error in query ${query.queryKey}: ${error.message}`);
                }
                return false;
            }
        }
    }
})