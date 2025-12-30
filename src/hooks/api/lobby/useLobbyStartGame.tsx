import {useMutation} from "@tanstack/react-query";
import {lobbyStartGame} from "../../../services/lobbyService.ts";
import {queryClient} from "../../../config/api";
import {currentGameSessionQueryKey} from "../../../config/api/queryKeys";

export function useLobbyStartGame() {
    const {mutateAsync:startGame, isPending: startGamePending, isError: startGameError,error} = useMutation(
        {
            mutationFn: async (lobbyId:string) => {
                return lobbyStartGame(lobbyId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: currentGameSessionQueryKey.current});
            }
        }
    )

    return {
        startGamePending,
        startGameError,
        error,
        startGame,
    }
}