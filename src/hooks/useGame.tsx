import {useSuspenseQuery} from "@tanstack/react-query";
import { getGame} from "../services/gameService.ts";

export function useGame(gameId: string){
    const {isLoading, isError, data: game} = useSuspenseQuery({
        queryKey: ['gamesList', gameId],
        queryFn: () => getGame(gameId),
    })
    return {isLoading, isError, game}
}