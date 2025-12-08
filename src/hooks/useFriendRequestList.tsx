import { useSuspenseQuery} from "@tanstack/react-query";
import {friendRequestQueryKey} from "../config/api/queryKeys";
import {findAllOpenFriendRequests} from "../services/friendService.ts";

export function useFriendRequestList(){
    const { data: friendRequests} = useSuspenseQuery({
        queryKey: friendRequestQueryKey.all,
        queryFn: () => findAllOpenFriendRequests(),
    })
    return {friendRequests}
}