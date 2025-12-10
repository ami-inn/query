import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";



export default function useWebsocketQueryInvalidate(){
    const queryClient = useQueryClient();
    useEffect(()=>{
        const handleMessage = (event: MessageEvent)=>{
            const queryKey = JSON.parse(event.data);
            queryClient.invalidateQueries({queryKey: queryKey});

        }

        const ws = new WebSocket('wss://example.com/websocket');

        ws.addEventListener('message', handleMessage);

        return ()=>{
            ws.removeEventListener('message', handleMessage);
            ws.close();
        }
    }, [])
}

// put the stale time to infinity so that data is not refetched automatically