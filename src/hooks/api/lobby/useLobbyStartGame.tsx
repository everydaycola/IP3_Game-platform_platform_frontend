import {useMutation} from "@tanstack/react-query";
import {lobbyStartGame} from "../../../services/lobbyService.ts";
import {queryClient} from "../../../config/api";
import {lobbyQueryKey} from "../../../config/api/queryKeys";

export function useLobbyStartGame() {
    const {mutateAsync:startGame, isPending: startGamePending, isError: startGameError,error} = useMutation(
        {
            mutationFn: async (lobbyId:string) => {
                return lobbyStartGame(lobbyId)
            },
            onSuccess: (_data, lobbyId) => {
                queryClient.invalidateQueries({
                    queryKey: lobbyQueryKey.currentLobby(lobbyId),
                })
            },
        }
    )

    return {
        startGamePending,
        startGameError,
        error,
        startGame,
    }
}