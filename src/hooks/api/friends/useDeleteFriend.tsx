import {useMutation, useQueryClient} from "@tanstack/react-query";
import {friendRecommendationsQueryKey, friendRequestQueryKey, friendsQueryKey} from "../../../config/api/queryKeys";
import {deleteFriend} from "../../../services/friendService.ts";


export function useDeleteFriend() {
    const queryClient = useQueryClient()
    const {mutate:removeFriend, isPending: removeFriendIsPending, isError: removeFriendIsError} = useMutation(
        {
            mutationFn: async (friendUsername:string) => {
                return deleteFriend(friendUsername)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: friendsQueryKey.all});
                queryClient.invalidateQueries({queryKey: friendRequestQueryKey.all});
                queryClient.invalidateQueries({queryKey: friendRecommendationsQueryKey.all});
            }
        }
    )

    return {
        removeFriendIsPending,
        removeFriendIsError,
        removeFriend
    }
}