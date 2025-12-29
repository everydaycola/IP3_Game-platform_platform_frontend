import { useSuspenseQuery} from "@tanstack/react-query";
import {lobbyQueryKey} from "../../../config/api/queryKeys";
import {findAllLobbies} from "../../../services/lobbyService.ts";

export function useLobbyList(){
    const { data: lobbies} = useSuspenseQuery({
        queryKey: lobbyQueryKey.all,
        queryFn: () => findAllLobbies(),
    })
    return {lobbies}
}