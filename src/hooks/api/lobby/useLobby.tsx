import { useSuspenseQuery} from "@tanstack/react-query";
import {lobbyQueryKey} from "../../../config/api/queryKeys";
import {findLobby} from "../../../services/lobbyService.ts";

export function useLobby(lobbyId:string){
    const { data: lobby} = useSuspenseQuery({
        queryKey: lobbyQueryKey.currentLobby(lobbyId),
        queryFn: () => findLobby(lobbyId),
    })
    return {lobby}
}