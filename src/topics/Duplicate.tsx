import { useQuery } from "@tanstack/react-query";

function LuckyNumber() {
    const { data,} = useQuery({
        queryKey: ["lucky-number"],
        queryFn:()=>{
            return Promise.resolve(Math.floor(Math.random()*100))
        }
    })
    return(
        <div>
            Lucky Number is {data}
        </div>
    )
}


const Duplicate = () => {
  return (
    <div>
        <LuckyNumber />
        <LuckyNumber />
      
    </div>
  )
}

export default Duplicate

// if you guess the ui is two different lucky numbers, you are wrong! they are the same because react query caches the result based on query key.

// deduplication is one of the main features of react query.
// put the value on the cache if the query key is same. take the value from cache instead of calling the query function again.
// this is useful when you have multiple components that need the same data. instead of calling the api multiple times, react query will call it once and share the result with all the components.
// even if its different component instances, as long as the query key is same, react query will share the result.

// observer pattern is used in react query to achieve this.
// when the data is updated, all the components that are using the same query key will be updated automatically.
// this is very useful in large applications where multiple components need the same data.