import {useMutation, useQueryClient} from "@tanstack/react-query";
import {gamesQueryKey} from "../config/api/queryKeys";
import {addFavoriteGame, removeFavoriteGame} from "../services/gameService.ts";


export function useFavoriteGame() {
    const queryClient = useQueryClient()
    const {mutate:addFavorite, isPending: addFavoritePending, isError: addFavoriteError} = useMutation(
        {
            mutationFn: async (gameId:string) => {
                return addFavoriteGame(gameId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: gamesQueryKey.all});
            }
        }
    )

    const {mutate:removeFavorite, isPending: removeFavoritePending, isError: removeFavoriteError} = useMutation(
        {
            mutationFn: async (gameId:string) => {
                return removeFavoriteGame(gameId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: gamesQueryKey.all});
            }
        }
    )

    return {
        addFavoritePending,
        addFavoriteError,
        addFavorite,
        removeFavoritePending,
        removeFavoriteError,
        removeFavorite
    }
}