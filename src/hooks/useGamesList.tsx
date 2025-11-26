import {useQuery} from "@tanstack/react-query";
import {findAllGames} from "../services/gameService.ts";
import {gamesQueryKey} from "../config/api/queryKeys";

export function useGamesList(){
    const {isLoading, isError, data: games} = useQuery({
        queryKey: gamesQueryKey.all,
        queryFn: () => findAllGames(),
    })
    return {isLoading, isError, games}
}