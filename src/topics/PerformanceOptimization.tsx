import { useQuery } from "@tanstack/react-query";
import React from "react";

const expensiveTransformFunction = (data: { id: number; name: string; updatedAt: Date }) => {
    return { name: data.name.toUpperCase() };
};

const {} = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
        console.log('Fetching user data...');
        return Promise.resolve({ id: 1, name: 'John Doe',updatedAt: new Date() } );
    },
    // select: (data) => {
    //     // Transform the data to include only the user's name in uppercase
    //     return { name: data.name.toUpperCase() };
    // } // Select is used to transform the data for optimization purpose
    select:React.useCallback(expensiveTransformFunction,[]) // useCallback to memoize the function so that it doesn't get recreated on every render
})

// if a component uses fetchstatus that means it will not re-render when the data changes

// react query will garbage collect the unused queries after 5 minutes by default

function useIssues(search: string) {
    return useQuery({
        queryKey: ["issues", search],
        queryFn:({signal}) => {
            const searchParams = new URLSearchParams()
            searchParams.append('q',search);
            const url = `https://api.github.com/search/issues?${searchParams.toString()}`;
            return fetch(url,{signal}).then(res=>{
                if(!res.ok){
                    throw new Error('Failed to fetch issues');
                }
                return res.json().then(data=>data.items);
            })
        }
    })
}

// debounce the search input to avoid too many requests
