import {useMutation, useQueryClient} from "@tanstack/react-query";
import {friendRecommendationsQueryKey, friendRequestQueryKey, friendsQueryKey} from "../../../config/api/queryKeys";
import {acceptFriendRequest, denyFriendRequest} from "../../../services/friendService.ts";


export function useFriendRequestResponse() {
    const queryClient = useQueryClient()
    const {mutate:acceptRequest, isPending: addRequestIsPending, isError: addRequestIsError} = useMutation(
        {
            mutationFn: async (friendUsername:string) => {
                return acceptFriendRequest(friendUsername)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: friendsQueryKey.all});
                queryClient.invalidateQueries({queryKey: friendRequestQueryKey.all});
                queryClient.invalidateQueries({queryKey: friendRecommendationsQueryKey.all});
            }
        }
    )

    const {mutate:denyRequest, isPending: denyRequestIsPending, isError: denyRequestIsError} = useMutation(
        {
            mutationFn: async (friendUsername:string) => {
                return denyFriendRequest(friendUsername)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: friendsQueryKey.all});
                queryClient.invalidateQueries({queryKey: friendRequestQueryKey.all});
                queryClient.invalidateQueries({queryKey: friendRecommendationsQueryKey.all});
            }
        }
    )

    return {
        addRequestIsPending,
        addRequestIsError,
        acceptRequest,
        denyRequestIsPending,
        denyRequestIsError,
        denyRequest
    }
}