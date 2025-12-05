import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime:1000 * 60, // 1 minute // data will be considered fresh for 1 minute
        }
    }
});

// for to set some default options for some keys
// fuzzy matching
queryClient.setQueryDefaults(['todos'],{
    staleTime:1000 * 30, // 30 seconds
    refetchOnWindowFocus:false,
    queryFn: async ({queryKey})=>{
        const baseUrl = '/api/todos';
        const slug = queryKey.join('/')
        const response = await fetch(baseUrl + slug)
        if(!response.ok){
            throw new Error('Failed to fetch todos')
        }
        return response.json();
    }
});

// then we can use it like this
function useTodos(){
    return queryClient.getQueryData(['todos']);
}

function useTodo(id:number){
    return queryClient.getQueryData(['todos',id]);
}
