import {useMutation, useQueryClient} from "@tanstack/react-query";
import {favoriteGamesQueryKey} from "../config/api/queryKeys";
import {addFavoriteGame, removeFavoriteGame} from "../services/favoriteGameService.ts";


export function useFavoriteGameUpdates() {
    const queryClient = useQueryClient()
    const {mutate:addFavorite, isPending: addFavoritePending, isError: addFavoriteError} = useMutation(
        {
            mutationFn: async (gameId:string) => {
                return addFavoriteGame(gameId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: favoriteGamesQueryKey.all});
            }
        }
    )

    const {mutate:removeFavorite, isPending: removeFavoritePending, isError: removeFavoriteError} = useMutation(
        {
            mutationFn: async (gameId:string) => {
                return removeFavoriteGame(gameId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: favoriteGamesQueryKey.all});
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