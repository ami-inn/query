import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";


async function toggleTodo(id: number) {
    const response = await fetch(`/api/todos/${id}/toggle`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to toggle todo');
    }
    return response.json();
}

function useToggleTodo(id: number) {
    return useMutation({
        mutationFn: () => toggleTodo(id),
        // onSuccess: ()=>{
        //     return queryClient.invalidateQueries({ queryKey: ['todos'] })
        // }
        // we need to update the cache manually
        onMutate:async ()=>{
            // u need to makesure there is not any ongoing mutation for the same todo
            // we need to makesure there is no refetch is happening at the same time
            await queryClient.cancelQueries({queryKey:['todos']});


            const snapShot = queryClient.getQueryData(['todos']);
            // if we put it inside the onmutate it will be executed before the mutation function
            // so we can do optimistic update here
            queryClient.setQueryData(['todos'],(oldData:any)=>{
                return oldData.map((todo:any)=>{
                    if(todo.id === id){
                        return {...todo,completed:!todo.completed}
                    }
                    return todo
                })
            })

            return ()=>{
                queryClient.setQueryData(['todos'],snapShot)
            }

        },
        // we optimistically updated the cache so if the mutation fail we need to rollback the change
        onError:(error,variables,rollback)=>{
            // we need an snapshot of the previous value before the mutation
            rollback?.();

        },
        onSettled:()=>{
            // it will run after all the mutation is completed either success or error
            return queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })
}

// an isue occur if user click the multiple checkbox very fast before the mutation is completed
// to solve this we can use optimistic update

function Todo ({todo}:any) {
    const {mutate,isPending} = useToggleTodo(todo.id);

  return(
    <li>
        <input
            type="checkbox"
            onChange={() => mutate()}
            checked={isPending ? !todo.completed : todo.completed}
            disabled={isPending}
        />
        {todo.text}
    </li>
  )
}