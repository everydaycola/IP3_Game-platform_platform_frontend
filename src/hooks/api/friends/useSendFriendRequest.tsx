import {useMutation, useQueryClient} from "@tanstack/react-query";
import {friendRecommendationsQueryKey, friendRequestQueryKey, friendsQueryKey} from "../../../config/api/queryKeys";
import {postFriendRequest} from "../../../services/friendService.ts";


export function useSendFriendRequest() {
    const queryClient = useQueryClient()
    const {mutate:sendFriendRequest, isPending: sendFriendRequestIsPending, isError: sendFriendRequestIsError, reset} = useMutation(
        {
            mutationFn: async (friendUsername:string) => {
                return postFriendRequest(friendUsername)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: friendsQueryKey.all});
                queryClient.invalidateQueries({queryKey: friendRequestQueryKey.all});
                queryClient.invalidateQueries({queryKey: friendRecommendationsQueryKey.all});
            }
        }
    )


    return {
        sendFriendRequestIsPending,
        sendFriendRequestIsError,
        reset,
        sendFriendRequest
    }
}