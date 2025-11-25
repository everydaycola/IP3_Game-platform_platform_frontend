import {useQuery} from "@tanstack/react-query";
import {findAllGames} from "../services/gameService.ts";

export function useGamesList(){
    const {isLoading, isError, data: games} = useQuery({
        queryKey: ['gamesList'],
        queryFn: () => findAllGames(),
    })
    return {isLoading, isError, games}
}