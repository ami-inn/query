
const fetchTodoById = async (id:number) => {}
export const todoKeys = {
    all:()=>['todos'],
    allList:()=>[...todoKeys.all(),'lists'],
    allLists: ()=> ['todos','lists'],
    list:(sort:string)=>['todos','lists',sort],
    detail:(id:number)=>({
        queryKey:['todos','detail',id],
        queryFn: () => fetchTodoById(id),
        staleTime : 1000 * 60 // 1 minute
    })
}