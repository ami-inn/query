import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

async function updateUser({id,name}:{id:number,name:string}) {
    const response = await fetch('https://api.example.com/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}


function useUpdateUser() {
    return useMutation({
        mutationFn: updateUser,
        onSuccess: (data,{id,name}) => {
            console.log('second argument to onSuccess:', {id,name}); // the argument passed to mutate
            alert('User updated successfully!');
            // queryClient.setQueryData(['user',data.id], data);
            queryClient.setQueryData(['user',data.id],(oldData:any)=> oldData?{...oldData,name:name}:oldData);
            // it means if oldData is present then update name else return oldData as it is
            // invalidate queries if you want to refetch
            // queryClient.invalidateQueries(['user',data.id]);
            // refetchtype all queries with key 'user' to get latest data
            // queryClient.invalidateQueries({
            //   queryKey: ['user'],    refetchType:"all"
            //  });
            queryClient.invalidateQueries({
                queryKey: ['user','list'],
                type:'active',// only refetch active queries
                stale:true, // mark the query as stale to refetch
                predicate: (query) => {
                    // custom logic to determine which queries to invalidate
                    return query.queryKey[1] === data.id;
                }
            });
            console.log('User updated successfully:', data);

        },
        onError: (error) => {
            console.error('Error updating user:', error);
        },
    });
}

function ChangeName() {
    const { mutate, isPending, isError, isSuccess, error } = useUpdateUser();

    const handleChangeName = () => {
        const newName = prompt('Enter new name:');
        if (newName) {
            mutate({id:1,name: newName});
        }
    };

    return (
        <div>
            <button onClick={handleChangeName} disabled={isPending}>
                {isPending ? 'Updating...' : 'Change Name'}
            </button>
            {isError && <p>Error: {(error as Error).message}</p>}
            {isSuccess && <p>Name updated successfully!</p>}
        </div>
    );
}