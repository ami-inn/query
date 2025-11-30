

import { useQuery } from "@tanstack/react-query"

const polling = () => {
    const {dataUpdatedAt} = useQuery({
        queryKey:['totalAmount'] ,
        queryFn: async () => {
            const res = await fetch('https://api.example.com/totalAmount')
            const data = await res.json()
            return data.totalAmount
        },
        // refetchInterval: 1000, // refetch every second
        refetchInterval: (query) => {
            if(query.state.data?.finished){
                return false
            }
            return 3000
        }
        // this means if the data has finished property true then stop polling else poll every 3 seconds

    })

    // used to keep data fresh by polling at regular intervals
    // dataUpdatedAt can be used to show when the data was last updated
 
}

export default polling
